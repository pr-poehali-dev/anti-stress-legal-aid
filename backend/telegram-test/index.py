import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Тестирует настройки Telegram бота и отправляет тестовое сообщение
    Args: event - dict с httpMethod
          context - object с request_id
    Returns: HTTP response с результатами проверки
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    # Получаем настройки
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    
    # Результаты проверки
    results = {
        'bot_token_exists': bool(bot_token),
        'bot_token_format': False,
        'chat_id_exists': bool(chat_id),
        'chat_id_format': False,
        'telegram_api_test': False,
        'errors': []
    }
    
    # Проверяем формат токена
    if bot_token:
        if ':' in bot_token and len(bot_token.split(':')) == 2:
            bot_part, hash_part = bot_token.split(':')
            if bot_part.isdigit() and len(hash_part) > 30:
                results['bot_token_format'] = True
            else:
                results['errors'].append('Неверный формат TELEGRAM_BOT_TOKEN')
        else:
            results['errors'].append('TELEGRAM_BOT_TOKEN должен содержать ":"')
    else:
        results['errors'].append('TELEGRAM_BOT_TOKEN не установлен')
    
    # Проверяем формат chat_id
    if chat_id:
        if chat_id.isdigit() or (chat_id.startswith('-') and chat_id[1:].isdigit()):
            results['chat_id_format'] = True
        else:
            results['errors'].append('TELEGRAM_CHAT_ID должен быть числом')
    else:
        results['errors'].append('TELEGRAM_CHAT_ID не установлен')
    
    # Тестируем API Telegram если настройки корректны
    if results['bot_token_format'] and results['chat_id_format']:
        try:
            test_message = f"🧪 Тест настроек Telegram\n\n✅ Бот настроен корректно!\n🆔 Request ID: {getattr(context, 'request_id', 'unknown')}"
            
            telegram_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
            
            data = {
                'chat_id': chat_id,
                'text': test_message
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
                    results['telegram_api_test'] = True
                else:
                    results['errors'].append(f"Telegram API ошибка: {telegram_response.get('description', 'Unknown error')}")
        
        except Exception as e:
            results['errors'].append(f"Ошибка при тестировании API: {str(e)}")
    
    # Формируем читаемый ответ
    status = "✅ Всё работает!" if results['telegram_api_test'] else "❌ Есть проблемы"
    
    response_data = {
        'status': status,
        'details': results,
        'recommendations': []
    }
    
    # Добавляем рекомендации
    if not results['bot_token_exists']:
        response_data['recommendations'].append('Добавьте TELEGRAM_BOT_TOKEN в секреты')
    elif not results['bot_token_format']:
        response_data['recommendations'].append('Проверьте формат TELEGRAM_BOT_TOKEN (должен быть: 123456789:AAA...)')
    
    if not results['chat_id_exists']:
        response_data['recommendations'].append('Добавьте TELEGRAM_CHAT_ID в секреты')
    elif not results['chat_id_format']:
        response_data['recommendations'].append('Проверьте формат TELEGRAM_CHAT_ID (должен быть числом)')
    
    if results['bot_token_format'] and results['chat_id_format'] and not results['telegram_api_test']:
        response_data['recommendations'].append('Проверьте что бот добавлен в чат и имеет права на отправку сообщений')
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(response_data, ensure_ascii=False, indent=2)
    }