import json
import requests
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Validate Telegram bot token and chat_id
    Args: event with bot_token and chat_id in body
    Returns: validation results and bot info
    '''
    method: str = event.get('httpMethod', 'GET')
    
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
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Только POST запросы'})
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        bot_token = body_data.get('bot_token', '').strip()
        chat_id = body_data.get('chat_id', '').strip()
        
        result = {
            'token_valid': False,
            'chat_id_valid': False,
            'bot_info': None,
            'errors': [],
            'suggestions': []
        }
        
        # Validate token format
        if not bot_token:
            result['errors'].append('Токен бота не указан')
        elif ':' not in bot_token or len(bot_token.split(':')) != 2:
            result['errors'].append('Неверный формат токена. Должен быть: 123456789:ABC-DEF1234ghIkl-zyx57W2v1u123ew11')
            result['suggestions'].append('Получите токен у @BotFather в Telegram')
        else:
            # Check token validity via Telegram API
            try:
                response = requests.get(f'https://api.telegram.org/bot{bot_token}/getMe', timeout=10)
                if response.status_code == 200:
                    bot_data = response.json()
                    if bot_data.get('ok'):
                        result['token_valid'] = True
                        result['bot_info'] = bot_data['result']
                    else:
                        result['errors'].append('Токен недействителен')
                elif response.status_code == 401:
                    result['errors'].append('Токен недействителен или отозван')
                else:
                    result['errors'].append('Ошибка проверки токена')
            except requests.RequestException:
                result['errors'].append('Не удалось подключиться к Telegram API')
        
        # Validate chat_id format
        if not chat_id:
            result['errors'].append('Chat ID не указан')
        elif not (chat_id.isdigit() or (chat_id.startswith('-') and chat_id[1:].isdigit())):
            result['errors'].append('Неверный формат Chat ID. Должно быть число, например: 123456789')
            result['suggestions'].append('Найдите ваш Chat ID через @userinfobot')
        else:
            # Test message sending if token is valid
            if result['token_valid']:
                try:
                    test_response = requests.post(
                        f'https://api.telegram.org/bot{bot_token}/sendMessage',
                        json={
                            'chat_id': chat_id,
                            'text': '🤖 Проверка настроек - этот Chat ID работает!',
                            'disable_notification': True
                        },
                        timeout=10
                    )
                    if test_response.status_code == 200:
                        test_data = test_response.json()
                        if test_data.get('ok'):
                            result['chat_id_valid'] = True
                        else:
                            error_desc = test_data.get('description', 'Неизвестная ошибка')
                            if 'chat not found' in error_desc.lower():
                                result['errors'].append('Чат не найден. Убедитесь, что написали боту первое сообщение')
                            elif 'blocked' in error_desc.lower():
                                result['errors'].append('Бот заблокирован пользователем')
                            else:
                                result['errors'].append(f'Ошибка отправки: {error_desc}')
                    else:
                        result['errors'].append('Не удалось отправить тестовое сообщение')
                except requests.RequestException:
                    result['errors'].append('Ошибка при тестировании отправки сообщения')
        
        # Generate QR code data for easy setup
        if result['token_valid'] and result['bot_info']:
            bot_username = result['bot_info'].get('username', '')
            if bot_username:
                result['qr_data'] = f'https://t.me/{bot_username}'
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(result, ensure_ascii=False)
        }
        
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неверный JSON'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Внутренняя ошибка: {str(e)}'})
        }