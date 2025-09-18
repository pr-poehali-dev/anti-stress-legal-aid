import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import Icon from '../ui/icon';
import { StepProps } from './types';

const EmailBackupStep: React.FC<StepProps> = ({ 
  state, 
  setState, 
  nextStep, 
  prevStep, 
  testEmailBackup 
}) => {
  const { emailUser, emailPassword, recipientEmail, isTestingEmail } = state;

  const setEmailUser = (value: string) => {
    setState(prev => ({ ...prev, emailUser: value }));
  };

  const setEmailPassword = (value: string) => {
    setState(prev => ({ ...prev, emailPassword: value }));
  };

  const setRecipientEmail = (value: string) => {
    setState(prev => ({ ...prev, recipientEmail: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Icon name="Mail" size={24} className="text-blue-500" />
          <span>Шаг 3: Email резерв</span>
        </CardTitle>
        <CardDescription>
          Настройте резервный канал уведомлений через email
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Icon name="Shield" size={16} />
          <AlertDescription>
            Email резерв будет использоваться автоматически, если Telegram недоступен.
            Это обеспечит 100% доставку важных уведомлений.
          </AlertDescription>
        </Alert>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-user">Email отправителя</Label>
              <Input
                id="email-user"
                type="email"
                placeholder="your-email@gmail.com"
                value={emailUser}
                onChange={(e) => setEmailUser(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-password">Пароль приложения</Label>
              <Input
                id="email-password"
                type="password"
                placeholder="Пароль от email"
                value={emailPassword}
                onChange={(e) => setEmailPassword(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Для Gmail используйте пароль приложения, не основной пароль
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipient-email">Email получателя</Label>
              <Input
                id="recipient-email"
                type="email"
                placeholder="admin@yoursite.com"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Alert>
              <Icon name="Key" size={16} />
              <AlertDescription>
                <strong>Настройка Gmail:</strong>
                <ol className="list-decimal list-inside mt-2 space-y-1 text-sm">
                  <li>Включите двухфакторную аутентификацию</li>
                  <li>Перейдите в "Управление аккаунтом Google"</li>
                  <li>Безопасность → Пароли приложений</li>
                  <li>Создайте пароль для "Почта"</li>
                  <li>Используйте этот пароль здесь</li>
                </ol>
              </AlertDescription>
            </Alert>

            <Button 
              onClick={testEmailBackup}
              disabled={!emailUser || !emailPassword || !recipientEmail || isTestingEmail}
              className="w-full"
              variant="outline"
            >
              {isTestingEmail ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin mr-2" />
                  Отправляю тест...
                </>
              ) : (
                <>
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить тестовый email
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={prevStep}>
            <Icon name="ChevronLeft" size={16} className="mr-2" />
            Назад
          </Button>
          <Button onClick={nextStep}>
            Далее
            <Icon name="ChevronRight" size={16} className="ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailBackupStep;