import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any

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
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    
    if not bot_token or not chat_id:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Настройки Telegram не настроены'})
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
            telegram_response = json.loads(response.read().decode('utf-8'))
            
            if not telegram_response.get('ok'):
                raise Exception(f"Telegram API error: {telegram_response}")
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Ошибка отправки в Telegram: {str(e)}'})
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