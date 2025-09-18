import json
import requests
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get chat_id automatically from bot updates
    Args: event with bot_token in body
    Returns: detected chat_ids from recent messages
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
        
        if not bot_token:
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Токен бота обязателен'})
            }
        
        # Get updates from Telegram
        try:
            response = requests.get(
                f'https://api.telegram.org/bot{bot_token}/getUpdates',
                params={'limit': 10, 'offset': -10},
                timeout=10
            )
            
            if response.status_code != 200:
                return {
                    'statusCode': 400,
                    'headers': {'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Неверный токен бота'})
                }
            
            data = response.json()
            if not data.get('ok'):
                return {
                    'statusCode': 400,
                    'headers': {'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Ошибка получения обновлений'})
                }
            
            updates = data.get('result', [])
            chat_ids = set()
            chat_info = {}
            
            # Extract chat IDs from recent messages
            for update in updates:
                message = update.get('message', {})
                if message:
                    chat = message.get('chat', {})
                    chat_id = chat.get('id')
                    if chat_id:
                        chat_ids.add(str(chat_id))
                        chat_info[str(chat_id)] = {
                            'type': chat.get('type', 'private'),
                            'title': chat.get('title', ''),
                            'username': chat.get('username', ''),
                            'first_name': chat.get('first_name', ''),
                            'last_name': chat.get('last_name', ''),
                            'last_message': message.get('text', '')[:50] + ('...' if len(message.get('text', '')) > 50 else '')
                        }
            
            result = {
                'chat_ids': list(chat_ids),
                'chat_info': chat_info,
                'total_found': len(chat_ids),
                'instruction': 'Если чатов не найдено, отправьте любое сообщение боту и повторите поиск'
            }
            
            if not chat_ids:
                result['suggestion'] = 'Перейдите к боту и отправьте команду /start или любое сообщение'
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(result, ensure_ascii=False)
            }
            
        except requests.RequestException as e:
            return {
                'statusCode': 500,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': f'Ошибка запроса к Telegram: {str(e)}'})
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