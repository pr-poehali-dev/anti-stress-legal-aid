import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import Icon from './ui/icon';

interface ValidationResult {
  token_valid: boolean;
  chat_id_valid: boolean;
  bot_info?: any;
  errors: string[];
  suggestions: string[];
  qr_data?: string;
}

interface ChatIdResult {
  chat_ids: string[];
  chat_info: Record<string, any>;
  total_found: number;
  instruction: string;
  suggestion?: string;
}

const NotificationSetup: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [botToken, setBotToken] = useState('');
  const [chatId, setChatId] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [chatIdResult, setChatIdResult] = useState<ChatIdResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [isSearchingChats, setIsSearchingChats] = useState(false);
  const [isTestingEmail, setIsTestingEmail] = useState(false);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  // Validate Telegram token and chat_id
  const validateTelegram = async () => {
    if (!botToken.trim()) {
      setValidationResult({
        token_valid: false,
        chat_id_valid: false,
        errors: ['Введите токен бота'],
        suggestions: []
      });
      return;
    }

    setIsValidating(true);
    try {
      const response = await fetch('https://functions.poehali.dev/ee6c5392-38db-41b7-a354-553ccb8537c4', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bot_token: botToken.trim(),
          chat_id: chatId.trim()
        })
      });

      if (response.ok) {
        const result = await response.json();
        setValidationResult(result);
      } else {
        setValidationResult({
          token_valid: false,
          chat_id_valid: false,
          errors: ['Ошибка проверки настроек'],
          suggestions: []
        });
      }
    } catch (error) {
      setValidationResult({
        token_valid: false,
        chat_id_valid: false,
        errors: ['Ошибка соединения с сервером'],
        suggestions: []
      });
    } finally {
      setIsValidating(false);
    }
  };

  // Auto-detect chat IDs
  const findChatIds = async () => {
    if (!botToken.trim()) return;

    setIsSearchingChats(true);
    try {
      const response = await fetch('https://functions.poehali.dev/790803b7-14dd-41a8-a0af-dc93cfb897ee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bot_token: botToken.trim() })
      });

      if (response.ok) {
        const result = await response.json();
        setChatIdResult(result);
      }
    } catch (error) {
      console.error('Error finding chat IDs:', error);
    } finally {
      setIsSearchingChats(false);
    }
  };

  // Test email backup
  const testEmailBackup = async () => {
    setIsTestingEmail(true);
    try {
      const response = await fetch('https://functions.poehali.dev/d9ad4234-e20a-4f33-a228-7ae29e45b0b4', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Тест Системы',
          contact: 'test@example.com',
          service: 'Авторские права',
          message: 'Это тестовое уведомление для проверки email резерва',
          urgency: 'Тест',
          timestamp: new Date().toLocaleString('ru-RU')
        })
      });

      const result = await response.json();
      if (response.ok && result.success) {
        alert('✅ Тестовое email отправлено успешно!');
      } else {
        alert('❌ Ошибка отправки email: ' + (result.error || 'Неизвестная ошибка'));
      }
    } catch (error) {
      alert('❌ Ошибка соединения с сервером');
    } finally {
      setIsTestingEmail(false);
    }
  };

  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, totalSteps));
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 1));

  const getStepIcon = (step: number) => {
    if (step < currentStep) return 'CheckCircle';
    if (step === currentStep) return 'Circle';
    return 'Circle';
  };

  const getStepColor = (step: number) => {
    if (step < currentStep) return 'text-green-500';
    if (step === currentStep) return 'text-blue-500';
    return 'text-gray-400';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Мастер настройки уведомлений</h1>
        <p className="text-gray-600">Пошаговая настройка Telegram бота и резервных каналов</p>
        
        <div className="flex items-center justify-center space-x-4 mt-6">
          <Progress value={progress} className="w-64" />
          <span className="text-sm text-gray-500">{currentStep}/{totalSteps}</span>
        </div>
      </div>

      {/* Steps Navigation */}
      <div className="flex justify-center space-x-8 py-4">
        {[
          { num: 1, title: 'Токен бота' },
          { num: 2, title: 'Chat ID' },
          { num: 3, title: 'Email резерв' },
          { num: 4, title: 'Проверка' }
        ].map(step => (
          <div key={step.num} className="flex flex-col items-center space-y-2">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              step.num <= currentStep 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 bg-gray-50'
            }`}>
              <Icon 
                name={getStepIcon(step.num)} 
                size={20} 
                className={getStepColor(step.num)}
              />
            </div>
            <span className={`text-xs font-medium ${
              step.num <= currentStep ? 'text-blue-600' : 'text-gray-400'
            }`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>

      <Separator />

      {/* Step 1: Bot Token */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="Bot" size={24} className="text-blue-500" />
              <span>Шаг 1: Токен Telegram бота</span>
            </CardTitle>
            <CardDescription>
              Создайте бота в Telegram и получите токен для отправки уведомлений
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Icon name="Info" size={16} />
              <AlertDescription>
                <strong>Как получить токен:</strong>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>Откройте Telegram и найдите @BotFather</li>
                  <li>Отправьте команду /newbot</li>
                  <li>Выберите имя и username для бота</li>
                  <li>Скопируйте полученный токен</li>
                </ol>
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="bot-token">Токен бота</Label>
              <Input
                id="bot-token"
                placeholder="123456789:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
                value={botToken}
                onChange={(e) => setBotToken(e.target.value)}
                className="font-mono text-sm"
              />
              <p className="text-xs text-gray-500">
                Формат: число:буквы_и_цифры (содержит символ ":")
              </p>
            </div>

            <Button 
              onClick={validateTelegram} 
              disabled={!botToken.trim() || isValidating}
              className="w-full"
            >
              {isValidating ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin mr-2" />
                  Проверяю токен...
                </>
              ) : (
                <>
                  <Icon name="CheckCircle" size={16} className="mr-2" />
                  Проверить токен
                </>
              )}
            </Button>

            {validationResult && (
              <div className="space-y-3">
                {validationResult.token_valid ? (
                  <Alert className="border-green-200 bg-green-50">
                    <Icon name="CheckCircle" size={16} className="text-green-600" />
                    <AlertDescription className="text-green-800">
                      ✅ Токен действителен! Бот: <strong>{validationResult.bot_info?.username}</strong>
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert className="border-red-200 bg-red-50">
                    <Icon name="AlertCircle" size={16} className="text-red-600" />
                    <AlertDescription className="text-red-800">
                      <div className="space-y-2">
                        {validationResult.errors.map((error, index) => (
                          <div key={index}>❌ {error}</div>
                        ))}
                        {validationResult.suggestions.map((suggestion, index) => (
                          <div key={index} className="text-blue-700">💡 {suggestion}</div>
                        ))}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" disabled>
                <Icon name="ChevronLeft" size={16} className="mr-2" />
                Назад
              </Button>
              <Button 
                onClick={nextStep} 
                disabled={!validationResult?.token_valid}
              >
                Далее
                <Icon name="ChevronRight" size={16} className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Chat ID */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="MessageSquare" size={24} className="text-blue-500" />
              <span>Шаг 2: Chat ID</span>
            </CardTitle>
            <CardDescription>
              Найдите ID чата, куда бот будет отправлять уведомления
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Автоматический поиск</h3>
                <Alert>
                  <Icon name="Lightbulb" size={16} />
                  <AlertDescription>
                    Напишите боту любое сообщение, затем нажмите кнопку поиска
                  </AlertDescription>
                </Alert>
                
                <Button 
                  onClick={findChatIds}
                  disabled={isSearchingChats}
                  variant="outline"
                  className="w-full"
                >
                  {isSearchingChats ? (
                    <>
                      <Icon name="Loader2" size={16} className="animate-spin mr-2" />
                      Ищу чаты...
                    </>
                  ) : (
                    <>
                      <Icon name="Search" size={16} className="mr-2" />
                      Найти Chat ID
                    </>
                  )}
                </Button>

                {chatIdResult && (
                  <div className="space-y-3">
                    {chatIdResult.total_found > 0 ? (
                      <div className="space-y-2">
                        <h4 className="font-medium text-green-600">Найдены чаты:</h4>
                        {chatIdResult.chat_ids.map(id => (
                          <div 
                            key={id}
                            className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                            onClick={() => setChatId(id)}
                          >
                            <div>
                              <div className="font-mono text-sm">{id}</div>
                              <div className="text-xs text-gray-500">
                                {chatIdResult.chat_info[id]?.type} • 
                                {chatIdResult.chat_info[id]?.first_name || chatIdResult.chat_info[id]?.title}
                              </div>
                            </div>
                            <Button size="sm" variant="ghost">
                              Выбрать
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Alert className="border-orange-200 bg-orange-50">
                        <Icon name="MessageSquare" size={16} className="text-orange-600" />
                        <AlertDescription className="text-orange-800">
                          {chatIdResult.instruction}
                          {chatIdResult.suggestion && (
                            <div className="mt-1 font-medium">{chatIdResult.suggestion}</div>
                          )}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Ручной ввод</h3>
                <div className="space-y-2">
                  <Label htmlFor="chat-id">Chat ID</Label>
                  <Input
                    id="chat-id"
                    placeholder="123456789 или -123456789"
                    value={chatId}
                    onChange={(e) => setChatId(e.target.value)}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500">
                    Положительное число для личных чатов, отрицательное для групп
                  </p>
                </div>

                <Alert>
                  <Icon name="Info" size={16} />
                  <AlertDescription>
                    <strong>Как найти Chat ID вручную:</strong>
                    <ol className="list-decimal list-inside mt-2 space-y-1 text-sm">
                      <li>Напишите @userinfobot в Telegram</li>
                      <li>Отправьте команду /start</li>
                      <li>Скопируйте ваш Chat ID</li>
                    </ol>
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            <Button 
              onClick={validateTelegram} 
              disabled={!chatId.trim() || isValidating}
              className="w-full"
            >
              {isValidating ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin mr-2" />
                  Проверяю Chat ID...
                </>
              ) : (
                <>
                  <Icon name="Send" size={16} className="mr-2" />
                  Проверить и отправить тест
                </>
              )}
            </Button>

            {validationResult && chatId && (
              <div className="space-y-3">
                {validationResult.chat_id_valid ? (
                  <Alert className="border-green-200 bg-green-50">
                    <Icon name="CheckCircle" size={16} className="text-green-600" />
                    <AlertDescription className="text-green-800">
                      ✅ Chat ID работает! Тестовое сообщение отправлено.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert className="border-red-200 bg-red-50">
                    <Icon name="AlertCircle" size={16} className="text-red-600" />
                    <AlertDescription className="text-red-800">
                      <div className="space-y-2">
                        {validationResult.errors.map((error, index) => (
                          <div key={index}>❌ {error}</div>
                        ))}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={prevStep}>
                <Icon name="ChevronLeft" size={16} className="mr-2" />
                Назад
              </Button>
              <Button 
                onClick={nextStep} 
                disabled={!validationResult?.chat_id_valid}
              >
                Далее
                <Icon name="ChevronRight" size={16} className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Email Backup */}
      {currentStep === 3 && (
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
      )}

      {/* Step 4: Final Check */}
      {currentStep === 4 && (
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
      )}
    </div>
  );
};

export default NotificationSetup;