import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Проверяет подключение и настройки Telegram бота
    Args: event - dict с httpMethod
          context - object с атрибутами контекста
    Returns: HTTP response dict с результатами проверки
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    # Получаем настройки Telegram
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN_NEW') or os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID_NEW') or os.environ.get('TELEGRAM_CHAT_ID')
    
    result = {
        'success': False,
        'checks': {},
        'errors': [],
        'recommendations': []
    }
    
    # Проверка 1: Наличие токена
    if not bot_token:
        result['errors'].append('TELEGRAM_BOT_TOKEN не найден')
        result['recommendations'].append('Добавьте секрет TELEGRAM_BOT_TOKEN_NEW в настройки проекта')
    else:
        result['checks']['token_exists'] = True
        
        # Проверка формата токена
        if ':' not in bot_token or len(bot_token) < 40:
            result['errors'].append('TELEGRAM_BOT_TOKEN имеет неверный формат')
            result['recommendations'].append('Токен должен быть вида: 1234567890:XXXXXXXXXXXXXXXXXXXXXXX')
        else:
            result['checks']['token_format'] = True
    
    # Проверка 2: Наличие chat_id
    if not chat_id:
        result['errors'].append('TELEGRAM_CHAT_ID не найден')
        result['recommendations'].append('Добавьте секрет TELEGRAM_CHAT_ID_NEW в настройки проекта')
    else:
        result['checks']['chat_id_exists'] = True
        
        # Проверка формата chat_id
        if ':' in chat_id or len(chat_id) > 15:
            result['errors'].append('TELEGRAM_CHAT_ID содержит токен бота вместо ID чата')
            result['recommendations'].append('Проверьте секреты - возможно TELEGRAM_CHAT_ID и TELEGRAM_BOT_TOKEN перепутаны местами')
        else:
            result['checks']['chat_id_format'] = True
    
    # Проверка 3: Подключение к Telegram API
    if bot_token and ':' in bot_token and len(bot_token) >= 40:
        try:
            telegram_url = f"https://api.telegram.org/bot{bot_token}/getMe"
            
            req = urllib.request.Request(telegram_url)
            with urllib.request.urlopen(req, timeout=10) as response:
                response_text = response.read().decode('utf-8')
                telegram_response = json.loads(response_text)
                
                if telegram_response.get('ok'):
                    bot_info = telegram_response.get('result', {})
                    result['checks']['bot_api_connection'] = True
                    result['bot_info'] = {
                        'username': bot_info.get('username'),
                        'first_name': bot_info.get('first_name'),
                        'can_join_groups': bot_info.get('can_join_groups'),
                        'can_read_all_group_messages': bot_info.get('can_read_all_group_messages')
                    }
                else:
                    result['errors'].append(f"Telegram API error: {telegram_response.get('description', 'Unknown')}")
        except Exception as e:
            result['errors'].append(f"Ошибка подключения к Telegram API: {str(e)}")
    
    # Проверка 4: Отправка тестового сообщения
    if (bot_token and chat_id and 
        result['checks'].get('token_format') and 
        result['checks'].get('chat_id_format') and 
        result['checks'].get('bot_api_connection')):
        
        try:
            test_message = "🧪 Тестовое сообщение от системы ЮрЗащита\\n\\nЕсли вы видите это сообщение, настройки Telegram работают корректно!"
            
            telegram_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
            data = {
                'chat_id': chat_id,
                'text': test_message,
                'parse_mode': 'Markdown'
            }
            
            encoded_data = urllib.parse.urlencode(data).encode('utf-8')
            req = urllib.request.Request(
                telegram_url,
                data=encoded_data,
                headers={'Content-Type': 'application/x-www-form-urlencoded'}
            )
            
            with urllib.request.urlopen(req, timeout=10) as response:
                response_text = response.read().decode('utf-8')
                telegram_response = json.loads(response_text)
                
                if telegram_response.get('ok'):
                    result['checks']['test_message_sent'] = True
                    result['success'] = True
                else:
                    error_desc = telegram_response.get('description', 'Unknown')
                    result['errors'].append(f"Не удалось отправить тестовое сообщение: {error_desc}")
                    
                    if 'chat not found' in error_desc.lower():
                        result['recommendations'].append('Убедитесь, что бот добавлен в чат и имеет права на отправку сообщений')
                    elif 'bot was blocked' in error_desc.lower():
                        result['recommendations'].append('Разблокируйте бота в Telegram')
                        
        except Exception as e:
            result['errors'].append(f"Ошибка при отправке тестового сообщения: {str(e)}")
    
    # Финальная оценка
    if not result['errors']:
        result['success'] = True
        result['message'] = 'Все проверки пройдены успешно!'
    else:
        result['message'] = f"Обнаружено проблем: {len(result['errors'])}"
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(result, ensure_ascii=False)
    }