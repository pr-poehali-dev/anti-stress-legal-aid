import json
import os
import psycopg2
from datetime import datetime, timezone
from typing import Dict, Any, Optional

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Log and retrieve notification history
    Args: event with method (GET to retrieve, POST to log)
    Returns: logs list or log confirmation
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    # Database connection
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'База данных недоступна'})
        }
    
    try:
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor()
        
        # Ensure table exists
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS notification_logs (
                id SERIAL PRIMARY KEY,
                timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                channel VARCHAR(50) NOT NULL,
                status VARCHAR(20) NOT NULL,
                recipient VARCHAR(255),
                subject VARCHAR(255),
                message TEXT,
                error_message TEXT,
                metadata JSONB
            )
        ''')
        conn.commit()
        
        if method == 'GET':
            # Retrieve logs
            params = event.get('queryStringParameters', {}) or {}
            limit = min(int(params.get('limit', 50)), 100)
            channel = params.get('channel', '')
            
            query = '''
                SELECT id, timestamp, channel, status, recipient, subject, 
                       LEFT(message, 100) as message_preview, error_message, metadata
                FROM notification_logs 
            '''
            query_params = []
            
            if channel:
                query += ' WHERE channel = %s'
                query_params.append(channel)
            
            query += ' ORDER BY timestamp DESC LIMIT %s'
            query_params.append(limit)
            
            cursor.execute(query, query_params)
            logs = []
            
            for row in cursor.fetchall():
                logs.append({
                    'id': row[0],
                    'timestamp': row[1].isoformat() if row[1] else None,
                    'channel': row[2],
                    'status': row[3],
                    'recipient': row[4],
                    'subject': row[5],
                    'message_preview': row[6],
                    'error_message': row[7],
                    'metadata': row[8]
                })
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'logs': logs,
                    'total': len(logs),
                    'filters': {'channel': channel, 'limit': limit}
                }, ensure_ascii=False, default=str)
            }
        
        elif method == 'POST':
            # Log new notification
            body_data = json.loads(event.get('body', '{}'))
            
            cursor.execute('''
                INSERT INTO notification_logs 
                (channel, status, recipient, subject, message, error_message, metadata)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                RETURNING id
            ''', (
                body_data.get('channel', ''),
                body_data.get('status', ''),
                body_data.get('recipient', ''),
                body_data.get('subject', ''),
                body_data.get('message', ''),
                body_data.get('error_message', ''),
                json.dumps(body_data.get('metadata', {}))
            ))
            
            log_id = cursor.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'log_id': log_id,
                    'message': 'Лог сохранен'
                })
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Метод не поддерживается'})
            }
            
    except psycopg2.Error as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Ошибка базы данных: {str(e)}'})
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
    finally:
        if 'conn' in locals():
            conn.close()