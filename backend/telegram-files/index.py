import json
import os
import requests
from typing import Dict, Any
from datetime import datetime
import time
import base64

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Отправляет заявки на анализ претензий в Telegram с файлами
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
            'headers': {
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Метод не поддерживается'})
        }
    
    # Получаем настройки Telegram
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN_NEW') or os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID_NEW') or os.environ.get('TELEGRAM_CHAT_ID')
    
    if not bot_token or not chat_id:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Настройки Telegram не найдены'})
        }

    # Парсим данные из body
    try:
        body_data = json.loads(event.get('body', '{}'))
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Неверный формат данных'})
        }
    
    # Проверяем обязательные поля
    name = body_data.get('name', '').strip()
    contact = body_data.get('contact', '').strip()
    description = body_data.get('description', '').strip()
    file_data = body_data.get('file')
    
    if not all([name, contact]):
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Заполните все обязательные поля'})
        }
    
    # Формируем текстовое сообщение
    telegram_message = f"""📋 Новая заявка на анализ претензии!

👤 Клиент: {name}
📞 Контакт: {contact}

📝 Описание ситуации:
{description if description else 'Не указано'}

💰 Стоимость: 5000 ₽
⏰ Время: {body_data.get('timestamp', datetime.now().strftime('%Y-%m-%d %H:%M:%S'))}

{f'📎 Файл: {file_data.get("name", "Прикреплен")}' if file_data else '📎 Файл: Не прикреплен'}"""

    # Отправляем текстовое сообщение
    telegram_success = False
    max_retries = 3
    
    for attempt in range(max_retries):
        try:
            telegram_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
            
            response = requests.post(
                telegram_url,
                data={
                    'chat_id': chat_id,
                    'text': telegram_message
                },
                timeout=15
            )
            
            if response.status_code == 200:
                telegram_response = response.json()
                if telegram_response.get('ok'):
                    telegram_success = True
                    break
                else:
                    error_msg = telegram_response.get('description', 'Unknown error')
                    if 'chat not found' in error_msg.lower() or 'bot was blocked' in error_msg.lower():
                        break
                        
        except Exception as e:
            print(f"Telegram attempt {attempt + 1} failed: {str(e)}")
            
        if attempt < max_retries - 1:
            time.sleep(1)
    
    # Если есть файл и сообщение отправлено - отправляем файл отдельно
    file_sent = False
    if telegram_success and file_data and 'data' in file_data:
        try:
            # Декодируем base64 файл
            file_content = base64.b64decode(file_data['data'])
            file_name = file_data.get('name', 'document.pdf')
            
            # Отправляем файл в Telegram
            file_url = f"https://api.telegram.org/bot{bot_token}/sendDocument"
            
            files = {
                'document': (file_name, file_content, file_data.get('type', 'application/octet-stream'))
            }
            
            data = {
                'chat_id': chat_id
            }
            
            response = requests.post(
                file_url,
                files=files,
                data=data,
                timeout=30
            )
            
            if response.status_code == 200:
                file_response = response.json()
                if file_response.get('ok'):
                    file_sent = True
                    
        except Exception as e:
            print(f"File sending failed: {str(e)}")
            # Отправляем сообщение о том, что файл не удалось отправить
            try:
                error_msg = f"⚠️ Файл '{file_data.get('name', 'документ')}' не удалось отправить. Попросите клиента прислать его повторно."
                requests.post(
                    f"https://api.telegram.org/bot{bot_token}/sendMessage",
                    data={
                        'chat_id': chat_id,
                        'text': error_msg
                    },
                    timeout=10
                )
            except:
                pass

    # Отправляем результат
    if telegram_success:
        message = 'Заявка успешно отправлена!'
        if file_data and file_sent:
            message += ' Файл также доставлен.'
        elif file_data and not file_sent:
            message += ' Файл будет обработан отдельно.'
            
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'message': message,
                'file_sent': file_sent
            })
        }
    else:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Ошибка отправки заявки'})
        }