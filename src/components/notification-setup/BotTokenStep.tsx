import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import Icon from '../ui/icon';
import { StepProps } from './types';

const BotTokenStep: React.FC<StepProps> = ({ 
  state, 
  setState, 
  nextStep, 
  validateTelegram 
}) => {
  const { botToken, validationResult, isValidating } = state;

  const setBotToken = (value: string) => {
    setState(prev => ({ ...prev, botToken: value }));
  };

  return (
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
  );
};

export default BotTokenStep;