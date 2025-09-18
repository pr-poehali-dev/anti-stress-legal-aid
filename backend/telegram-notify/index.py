import json
import os
import urllib.request
import urllib.parse
import requests
from typing import Dict, Any
from datetime import datetime

def log_notification(channel: str, status: str, recipient: str, subject: str, message: str, error: str = None, metadata: dict = None):
    """Log notification attempt to monitoring system"""
    try:
        log_data = {
            'channel': channel,
            'status': status,
            'recipient': recipient,
            'subject': subject,
            'message': message[:500],  # Limit message length
            'error_message': error,
            'metadata': metadata or {}
        }
        
        # Try to send to log function (don't fail main function if logging fails)
        requests.post(
            'https://functions.poehali.dev/e74ceb41-1c4c-4834-93ce-1c8ca94144d9',
            json=log_data,
            timeout=5
        )
    except:
        pass  # Logging failure shouldn't break main functionality

def send_backup_email(body_data: dict, context, email_type: str = 'backup') -> bool:
    """Send backup email notification"""
    try:
        # Add email type to body for proper handling
        email_data = body_data.copy()
        email_data['email_type'] = email_type
        email_data['timestamp'] = email_data.get('timestamp', datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
        
        response = requests.post(
            'https://functions.poehali.dev/d9ad4234-e20a-4f33-a228-7ae29e45b0b4',
            json=email_data,
            timeout=15
        )
        
        if response.status_code == 200:
            result = response.json()
            return result.get('success', False)
        else:
            print(f"Email backup failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"Email backup error: {str(e)}")
        return False

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Отправляет уведомления о заказах в Telegram бот с обязательной темой "Авторские права"
    Args: event - dict с httpMethod, body, headers
          context - object с request_id и другими атрибутами
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'POST')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Метод не поддерживается'})
        }
    
    # Получаем данные из формы
    try:
        body_data = json.loads(event.get('body', '{}'))
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неверный формат данных'})
        }
    
    # Проверяем обязательные поля
    name = body_data.get('name', '').strip()
    contact = body_data.get('contact', '').strip()
    service = body_data.get('service', '').strip()
    
    if not all([name, contact, service]):
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Заполните все обязательные поля'})
        }
    
    # Проверяем что выбрана тема "Авторские права"
    if service != 'Авторские права':
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Доступна только тема "Авторские права"'})
        }
    
    # Получаем настройки Telegram (используем новые секреты)
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN_NEW') or os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID_NEW') or os.environ.get('TELEGRAM_CHAT_ID')
    
    print(f"DEBUG: bot_token exists: {bool(bot_token)}")
    print(f"DEBUG: chat_id: {chat_id}")
    
    if not bot_token:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'TELEGRAM_BOT_TOKEN не настроен'})
        }
    
    if not chat_id:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'TELEGRAM_CHAT_ID не настроен'})
        }
    
    # Дополнительная проверка форматов (частая ошибка - перепутанные секреты)
    if ':' in chat_id or len(chat_id) > 15:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'TELEGRAM_CHAT_ID содержит токен бота. Проверьте секреты - возможно они перепутаны местами'})
        }
    
    if ':' not in bot_token or len(bot_token) < 40:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'TELEGRAM_BOT_TOKEN должен содержать : и быть длиннее 40 символов. Проверьте секреты'})
        }
    
    # Формируем сообщение
    urgency = body_data.get('urgency', 'Неделя')
    message_text = body_data.get('message', '').strip()
    
    telegram_message = f"""🔔 Новый заказ на сайте ЮрЗащита!

👤 Клиент: {name}
📞 Контакт: {contact}
⚖️ Услуга: {service}
⏰ Срочность: {urgency}

💬 Сообщение:
{message_text if message_text else 'Не указано'}

🆔 ID заявки: {getattr(context, 'request_id', 'unknown')}
📅 Время: {body_data.get('timestamp', 'не указано')}"""
    
    # Отправляем в Telegram
    try:
        telegram_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        print(f"DEBUG: Sending to Telegram URL: {telegram_url[:50]}...")
        
        data = {
            'chat_id': chat_id,
            'text': telegram_message,
            'parse_mode': 'HTML'
        }
        
        encoded_data = urllib.parse.urlencode(data).encode('utf-8')
        
        req = urllib.request.Request(
            telegram_url,
            data=encoded_data,
            headers={'Content-Type': 'application/x-www-form-urlencoded'}
        )
        
        with urllib.request.urlopen(req, timeout=10) as response:
            response_text = response.read().decode('utf-8')
            print(f"DEBUG: Telegram response: {response_text}")
            telegram_response = json.loads(response_text)
            
            if not telegram_response.get('ok'):
                print(f"ERROR: Telegram API error: {telegram_response}")
                log_notification('telegram', 'failed', chat_id, f'Заказ от {name}', telegram_message, 
                               str(telegram_response), {'service': service, 'urgency': urgency})
                raise Exception(f"Telegram API error: {telegram_response}")
            else:
                # Success logging
                log_notification('telegram', 'success', chat_id, f'Заказ от {name}', telegram_message, 
                               None, {'service': service, 'urgency': urgency})
                
                # ALWAYS send backup email after successful Telegram
                send_backup_email(body_data, context, 'backup')
    
    except Exception as e:
        print(f"ERROR: Exception in Telegram send: {str(e)}")
        log_notification('telegram', 'error', chat_id, f'Заказ от {name}', telegram_message, 
                       str(e), {'service': service, 'urgency': urgency})
        
        # Send backup email when Telegram fails
        email_result = send_backup_email(body_data, context, 'fallback')
        
        if email_result:
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'message': 'Telegram недоступен, заявка отправлена по email',
                    'fallback': True,
                    'request_id': getattr(context, 'request_id', 'unknown')
                })
            }
        else:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': f'Ошибка отправки в Telegram и email: {str(e)}'})
            }
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'success': True,
            'message': 'Заявка успешно отправлена!',
            'request_id': getattr(context, 'request_id', 'unknown')
        })
    }