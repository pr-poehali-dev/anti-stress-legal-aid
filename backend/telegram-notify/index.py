import json
import os
import urllib.request
import urllib.parse
import requests
from typing import Dict, Any
from datetime import datetime
import time

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
    
    # Получаем настройки Telegram
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN_NEW') or os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID_NEW') or os.environ.get('TELEGRAM_CHAT_ID')
    
    if not bot_token or not chat_id:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Настройки Telegram не найдены'})
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

📅 Время: {body_data.get('timestamp', datetime.now().strftime('%Y-%m-%d %H:%M:%S'))}"""
    
    # Отправляем в Telegram с retry логикой
    telegram_success = False
    max_retries = 3
    
    for attempt in range(max_retries):
        try:
            telegram_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
            
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
            
            with urllib.request.urlopen(req, timeout=15) as response:
                response_text = response.read().decode('utf-8')
                telegram_response = json.loads(response_text)
                
                if telegram_response.get('ok'):
                    telegram_success = True
                    break
                else:
                    error_msg = telegram_response.get('description', 'Unknown error')
                    # Don't retry on certain permanent errors
                    if 'chat not found' in error_msg.lower() or 'bot was blocked' in error_msg.lower():
                        break
                        
        except Exception as e:
            print(f"Telegram attempt {attempt + 1} failed: {str(e)}")
            
        # Wait before retry (except on last attempt)
        if attempt < max_retries - 1:
            time.sleep(1)
    
    # Handle result
    if telegram_success:
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'message': 'Заявка успешно отправлена!'
            })
        }
    else:
        # Send backup email when Telegram fails
        try:
            email_data = body_data.copy()
            email_data['email_type'] = 'fallback'
            email_data['timestamp'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            
            response = requests.post(
                'https://functions.poehali.dev/d9ad4234-e20a-4f33-a228-7ae29e45b0b4',
                json=email_data,
                timeout=20,
                headers={'Content-Type': 'application/json'}
            )
            
            if response.status_code == 200 and response.json().get('success'):
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'success': True,
                        'message': 'Telegram недоступен, заявка отправлена по email',
                        'fallback': True
                    })
                }
        except:
            pass
        
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Ошибка отправки уведомления'})
        }