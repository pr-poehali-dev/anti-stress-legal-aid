import json
import os
import urllib.request
import urllib.parse
import requests
from typing import Dict, Any
from datetime import datetime
import time
import mimetypes
import io

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Отправляет заявки на анализ претензий в Telegram с файлами
    Args: event - dict с httpMethod, body, headers (multipart/form-data)
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
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Метод не поддерживается'})
        }
    
    # Получаем настройки Telegram
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN_NEW') or os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID_NEW') or os.environ.get('TELEGRAM_CHAT_ID')
    
    if not bot_token or not chat_id:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Настройки Telegram не найдены'})
        }

    # Парсим данные из body (JSON формат из фронтенда)
    try:
        body_data = json.loads(event.get('body', '{}'))
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
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
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
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
            import base64
            file_content = base64.b64decode(file_data['data'])
            file_name = file_data.get('name', 'document.pdf')
            
            # Определяем тип файла
            mime_type = file_data.get('type') or mimetypes.guess_type(file_name)[0] or 'application/octet-stream'
            
            # Отправляем файл в Telegram
            file_url = f"https://api.telegram.org/bot{bot_token}/sendDocument"
            
            # Формируем multipart данные
            boundary = '----WebKitFormBoundary' + str(int(time.time()))
            
            multipart_data = []
            multipart_data.append(f'--{boundary}')
            multipart_data.append('Content-Disposition: form-data; name="chat_id"')
            multipart_data.append('')
            multipart_data.append(chat_id)
            
            multipart_data.append(f'--{boundary}')
            multipart_data.append(f'Content-Disposition: form-data; name="document"; filename="{file_name}"')
            multipart_data.append(f'Content-Type: {mime_type}')
            multipart_data.append('')
            
            # Собираем данные
            multipart_str = '\r\n'.join(multipart_data) + '\r\n'
            multipart_bytes = multipart_str.encode('utf-8')
            multipart_bytes += file_content
            multipart_bytes += f'\r\n--{boundary}--\r\n'.encode('utf-8')
            
            req = urllib.request.Request(
                file_url,
                data=multipart_bytes,
                headers={
                    'Content-Type': f'multipart/form-data; boundary={boundary}',
                    'Content-Length': str(len(multipart_bytes))
                }
            )
            
            with urllib.request.urlopen(req, timeout=30) as response:
                response_text = response.read().decode('utf-8')
                file_response = json.loads(response_text)
                
                if file_response.get('ok'):
                    file_sent = True
                    
        except Exception as e:
            print(f"File sending failed: {str(e)}")
            # Отправляем сообщение о том, что файл не удалось отправить
            try:
                error_msg = f"⚠️ Файл '{file_data.get('name', 'документ')}' не удалось отправить. Попросите клиента прислать его повторно."
                error_data = {
                    'chat_id': chat_id,
                    'text': error_msg
                }
                encoded_error = urllib.parse.urlencode(error_data).encode('utf-8')
                error_req = urllib.request.Request(
                    f"https://api.telegram.org/bot{bot_token}/sendMessage",
                    data=encoded_error,
                    headers={'Content-Type': 'application/x-www-form-urlencoded'}
                )
                urllib.request.urlopen(error_req, timeout=10)
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