import json
import smtplib
import os
import requests
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send backup email notifications when Telegram fails
    Args: event with order data and notification details
    Returns: email sending status
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
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Только POST запросы'})
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        
        # Required fields
        name = body_data.get('name', '').strip()
        contact = body_data.get('contact', '').strip()
        service = body_data.get('service', '').strip()
        
        if not all([name, contact, service]):
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Обязательные поля: name, contact, service'})
            }
        
        # Email configuration from secrets
        smtp_server = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
        smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        email_user = os.environ.get('EMAIL_USER')
        email_password = os.environ.get('EMAIL_PASSWORD')
        recipient_email = os.environ.get('RECIPIENT_EMAIL')
        
        if not all([email_user, email_password, recipient_email]):
            return {
                'statusCode': 500,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Email настройки не сконфигурированы'})
            }
        
        # Create email message
        urgency = body_data.get('urgency', 'Неделя')
        message_text = body_data.get('message', '').strip()
        request_id = getattr(context, 'request_id', 'unknown')
        email_type = body_data.get('email_type', 'fallback')
        
        # Different subject and styling based on email type
        if email_type == 'backup':
            subject = f"[ДУБЛЬ] Новый заказ от {name} - {service}"
            status_text = "✅ Telegram доставлен (это дубль для надёжности)"
            gradient_color = "linear-gradient(135deg, #10b981 0%, #059669 100%)"
            icon = "📋"
            header_title = "ДУБЛИРУЮЩЕЕ УВЕДОМЛЕНИЕ"
        else:  # fallback
            subject = f"[РЕЗЕРВ] Новый заказ от {name} - {service}"
            status_text = "❌ Telegram недоступен (используется email резерв)"
            gradient_color = "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
            icon = "⚡"
            header_title = "РЕЗЕРВНОЕ УВЕДОМЛЕНИЕ"
        
        html_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: {gradient_color}; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">{icon} {header_title}</h1>
                <p style="color: #f0f0f0; margin: 5px 0;">{status_text}</p>
            </div>
            
            <div style="padding: 20px; background: #f9f9f9;">
                <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                    🔔 Новый заказ на сайте ЮрЗащита
                </h2>
                
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; background: #fff; font-weight: bold;">👤 Клиент:</td>
                        <td style="padding: 10px; border: 1px solid #ddd; background: #fff;">{name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; background: #f8f8f8; font-weight: bold;">📞 Контакт:</td>
                        <td style="padding: 10px; border: 1px solid #ddd; background: #f8f8f8;">{contact}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; background: #fff; font-weight: bold;">⚖️ Услуга:</td>
                        <td style="padding: 10px; border: 1px solid #ddd; background: #fff;">{service}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; background: #f8f8f8; font-weight: bold;">⏰ Срочность:</td>
                        <td style="padding: 10px; border: 1px solid #ddd; background: #f8f8f8;">{urgency}</td>
                    </tr>
                </table>
                
                <div style="background: #fff; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea;">
                    <h3 style="margin-top: 0; color: #333;">💬 Сообщение:</h3>
                    <p style="color: #666; line-height: 1.6;">{message_text if message_text else 'Не указано'}</p>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: #e8f4f8; border-radius: 5px;">
                    <p style="margin: 0; color: #555;">
                        <strong>🆔 ID заявки:</strong> {request_id}<br>
                        <strong>📅 Время:</strong> {body_data.get('timestamp', 'не указано')}<br>
                        <strong>🔄 Статус доставки:</strong> {status_text}
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Create message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = email_user
        msg['To'] = recipient_email
        
        # Add HTML part
        html_part = MIMEText(html_body, 'html', 'utf-8')
        msg.attach(html_part)
        
        # Send email
        try:
            server = smtplib.SMTP(smtp_server, smtp_port)
            server.starttls()
            server.login(email_user, email_password)
            server.send_message(msg)
            server.quit()
            
            # Log success
            try:
                requests.post(
                    'https://functions.poehali.dev/e74ceb41-1c4c-4834-93ce-1c8ca94144d9',
                    json={
                        'channel': f'email_{email_type}',
                        'status': 'success',
                        'recipient': recipient_email,
                        'subject': subject,
                        'message': f'{header_title} для заказа от {name}',
                        'metadata': {'service': service, 'urgency': urgency, 'request_id': request_id, 'email_type': email_type}
                    },
                    timeout=5
                )
            except:
                pass
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'message': f'{header_title} отправлено по email',
                    'recipient': recipient_email,
                    'email_type': email_type,
                    'request_id': request_id
                })
            }
            
        except smtplib.SMTPException as e:
            # Log failure
            try:
                requests.post(
                    'https://functions.poehali.dev/e74ceb41-1c4c-4834-93ce-1c8ca94144d9',
                    json={
                        'channel': f'email_{email_type}',
                        'status': 'failed',
                        'recipient': recipient_email,
                        'subject': subject,
                        'message': f'{header_title} для заказа от {name}',
                        'error_message': str(e),
                        'metadata': {'service': service, 'urgency': urgency, 'email_type': email_type}
                    },
                    timeout=5
                )
            except:
                pass
                
            return {
                'statusCode': 500,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': f'Ошибка отправки email: {str(e)}'})
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