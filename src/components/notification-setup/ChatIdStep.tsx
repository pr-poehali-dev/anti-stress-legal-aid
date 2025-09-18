import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import Icon from '../ui/icon';
import { StepProps } from './types';

const ChatIdStep: React.FC<StepProps> = ({ 
  state, 
  setState, 
  nextStep, 
  prevStep, 
  validateTelegram, 
  findChatIds 
}) => {
  const { 
    chatId, 
    validationResult, 
    chatIdResult, 
    isValidating, 
    isSearchingChats 
  } = state;

  const setChatId = (value: string) => {
    setState(prev => ({ ...prev, chatId: value }));
  };

  return (
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
  );
};

export default ChatIdStep;