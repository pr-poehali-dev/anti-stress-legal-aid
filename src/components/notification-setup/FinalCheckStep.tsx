import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Separator } from '../ui/separator';
import Icon from '../ui/icon';
import { StepProps } from './types';

const FinalCheckStep: React.FC<StepProps> = ({ 
  state, 
  prevStep 
}) => {
  const { 
    botToken, 
    chatId, 
    emailUser, 
    recipientEmail, 
    validationResult 
  } = state;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={24} className="text-green-500" />
          <span>Шаг 4: Проверка настроек</span>
        </CardTitle>
        <CardDescription>
          Убедитесь, что все настройки работают правильно
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Telegram</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Токен бота</div>
                  <div className="text-sm text-gray-500 font-mono">
                    {botToken ? `${botToken.substring(0, 20)}...` : 'Не указан'}
                  </div>
                </div>
                <Badge variant={validationResult?.token_valid ? 'default' : 'destructive'}>
                  {validationResult?.token_valid ? 'OK' : 'Ошибка'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Chat ID</div>
                  <div className="text-sm text-gray-500 font-mono">
                    {chatId || 'Не указан'}
                  </div>
                </div>
                <Badge variant={validationResult?.chat_id_valid ? 'default' : 'destructive'}>
                  {validationResult?.chat_id_valid ? 'OK' : 'Ошибка'}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Email резерв</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Отправитель</div>
                  <div className="text-sm text-gray-500">
                    {emailUser || 'Не указан'}
                  </div>
                </div>
                <Badge variant={emailUser ? 'default' : 'secondary'}>
                  {emailUser ? 'Заполнен' : 'Пустой'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Получатель</div>
                  <div className="text-sm text-gray-500">
                    {recipientEmail || 'Не указан'}
                  </div>
                </div>
                <Badge variant={recipientEmail ? 'default' : 'secondary'}>
                  {recipientEmail ? 'Заполнен' : 'Пустой'}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-semibold text-center">Сохранение настроек</h3>
          <Alert>
            <Icon name="Settings" size={16} />
            <AlertDescription>
              Настройки сохраняются в секретах проекта. После сохранения система уведомлений 
              будет работать автоматически со всеми формами на сайте.
            </AlertDescription>
          </Alert>

          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Чтобы завершить настройку, сохраните следующие секреты в панели poehali.dev:
            </p>
            
            <div className="grid gap-2 text-sm font-mono bg-gray-50 p-4 rounded-lg">
              <div><strong>TELEGRAM_BOT_TOKEN_NEW:</strong> {botToken}</div>
              <div><strong>TELEGRAM_CHAT_ID_NEW:</strong> {chatId}</div>
              <div><strong>EMAIL_USER:</strong> {emailUser}</div>
              <div><strong>EMAIL_PASSWORD:</strong> [ваш пароль приложения]</div>
              <div><strong>RECIPIENT_EMAIL:</strong> {recipientEmail}</div>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={prevStep}>
            <Icon name="ChevronLeft" size={16} className="mr-2" />
            Назад
          </Button>
          <Button 
            onClick={() => alert('Настройка завершена! Сохраните секреты в панели управления.')}
            className="bg-green-600 hover:bg-green-700"
          >
            <Icon name="Check" size={16} className="mr-2" />
            Завершить настройку
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinalCheckStep;