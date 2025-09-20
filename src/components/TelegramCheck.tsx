import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function TelegramCheck() {
  const [isChecking, setIsChecking] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);

  const checkTelegramSettings = async () => {
    setIsChecking(true);
    try {
      toast.info('🔄 Проверяю настройки Telegram...');
      
      const response = await fetch('https://functions.poehali.dev/caa09c80-487a-4b79-b4bc-8629fad14399', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setLastResult(result);
        
        if (result.success) {
          toast.success('✅ Все настройки Telegram корректны! Проверьте чат на тестовое сообщение.');
        } else {
          const errorCount = result.errors?.length || 0;
          toast.error(`❌ Найдено проблем: ${errorCount}. Проверьте детали ниже.`);
          
          if (result.recommendations?.length > 0) {
            result.recommendations.forEach((rec: string, index: number) => {
              setTimeout(() => {
                toast.info(`💡 ${rec}`, { duration: 8000 });
              }, (index + 1) * 1000);
            });
          }
        }
      } else {
        toast.error('❌ Ошибка при проверке настроек');
        setLastResult({ success: false, errors: ['Ошибка HTTP ' + response.status] });
      }
    } catch (error) {
      console.error('Check error:', error);
      toast.error('❌ Не удалось выполнить проверку');
      setLastResult({ success: false, errors: ['Ошибка сети'] });
    }
    
    setIsChecking(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="MessageSquare" size={24} />
          Проверка настроек Telegram
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          Эта проверка убедится, что бот настроен правильно и может отправлять уведомления.
        </p>
        
        <Button 
          onClick={checkTelegramSettings}
          disabled={isChecking}
          className="w-full"
        >
          {isChecking ? (
            <>
              <Icon name="Loader2" className="mr-2 animate-spin" size={16} />
              Проверяю...
            </>
          ) : (
            <>
              <Icon name="Play" className="mr-2" size={16} />
              Запустить проверку
            </>
          )}
        </Button>

        {lastResult && (
          <div className="mt-4 p-4 rounded-lg bg-gray-50">
            <h4 className="font-medium mb-2">
              {lastResult.success ? '✅ Результат проверки' : '❌ Результат проверки'}
            </h4>
            
            {lastResult.checks && (
              <div className="space-y-1 text-sm">
                {Object.entries(lastResult.checks).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    {value ? '✅' : '❌'}
                    <span className="capitalize">{key.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            )}
            
            {lastResult.bot_info && (
              <div className="mt-2 text-sm">
                <strong>Информация о боте:</strong>
                <div>@{lastResult.bot_info.username} ({lastResult.bot_info.first_name})</div>
              </div>
            )}
            
            {lastResult.errors && lastResult.errors.length > 0 && (
              <div className="mt-2">
                <strong className="text-red-600">Ошибки:</strong>
                <ul className="list-disc list-inside text-sm text-red-600">
                  {lastResult.errors.map((error: string, index: number) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {lastResult.recommendations && lastResult.recommendations.length > 0 && (
              <div className="mt-2">
                <strong className="text-blue-600">Рекомендации:</strong>
                <ul className="list-disc list-inside text-sm text-blue-600">
                  {lastResult.recommendations.map((rec: string, index: number) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}