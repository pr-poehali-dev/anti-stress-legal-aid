import React, { useState } from 'react';
import StepHeader from './notification-setup/StepHeader';
import BotTokenStep from './notification-setup/BotTokenStep';
import ChatIdStep from './notification-setup/ChatIdStep';
import EmailBackupStep from './notification-setup/EmailBackupStep';
import FinalCheckStep from './notification-setup/FinalCheckStep';
import { NotificationSetupState, ValidationResult, ChatIdResult } from './notification-setup/types';

const NotificationSetup: React.FC = () => {
  const [state, setState] = useState<NotificationSetupState>({
    currentStep: 1,
    botToken: '',
    chatId: '',
    emailUser: '',
    emailPassword: '',
    recipientEmail: '',
    validationResult: null,
    chatIdResult: null,
    isValidating: false,
    isSearchingChats: false,
    isTestingEmail: false,
  });

  const totalSteps = 4;

  // Validate Telegram token and chat_id
  const validateTelegram = async () => {
    if (!state.botToken.trim()) {
      setState(prev => ({
        ...prev,
        validationResult: {
          token_valid: false,
          chat_id_valid: false,
          errors: ['Введите токен бота'],
          suggestions: []
        }
      }));
      return;
    }

    setState(prev => ({ ...prev, isValidating: true }));
    try {
      const response = await fetch('https://functions.poehali.dev/ee6c5392-38db-41b7-a354-553ccb8537c4', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bot_token: state.botToken.trim(),
          chat_id: state.chatId.trim()
        })
      });

      if (response.ok) {
        const result: ValidationResult = await response.json();
        setState(prev => ({ ...prev, validationResult: result }));
      } else {
        setState(prev => ({
          ...prev,
          validationResult: {
            token_valid: false,
            chat_id_valid: false,
            errors: ['Ошибка проверки настроек'],
            suggestions: []
          }
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        validationResult: {
          token_valid: false,
          chat_id_valid: false,
          errors: ['Ошибка соединения с сервером'],
          suggestions: []
        }
      }));
    } finally {
      setState(prev => ({ ...prev, isValidating: false }));
    }
  };

  // Auto-detect chat IDs
  const findChatIds = async () => {
    if (!state.botToken.trim()) return;

    setState(prev => ({ ...prev, isSearchingChats: true }));
    try {
      const response = await fetch('https://functions.poehali.dev/790803b7-14dd-41a8-a0af-dc93cfb897ee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bot_token: state.botToken.trim() })
      });

      if (response.ok) {
        const result: ChatIdResult = await response.json();
        setState(prev => ({ ...prev, chatIdResult: result }));
      }
    } catch (error) {
      console.error('Error finding chat IDs:', error);
    } finally {
      setState(prev => ({ ...prev, isSearchingChats: false }));
    }
  };

  // Test email backup
  const testEmailBackup = async () => {
    setState(prev => ({ ...prev, isTestingEmail: true }));
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
      setState(prev => ({ ...prev, isTestingEmail: false }));
    }
  };

  const nextStep = () => setState(prev => ({ 
    ...prev, 
    currentStep: Math.min(prev.currentStep + 1, totalSteps) 
  }));

  const prevStep = () => setState(prev => ({ 
    ...prev, 
    currentStep: Math.max(prev.currentStep - 1, 1) 
  }));

  const stepProps = {
    state,
    setState,
    nextStep,
    prevStep,
    validateTelegram,
    findChatIds,
    testEmailBackup
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <StepHeader currentStep={state.currentStep} totalSteps={totalSteps} />

      {state.currentStep === 1 && <BotTokenStep {...stepProps} />}
      {state.currentStep === 2 && <ChatIdStep {...stepProps} />}
      {state.currentStep === 3 && <EmailBackupStep {...stepProps} />}
      {state.currentStep === 4 && <FinalCheckStep {...stepProps} />}
    </div>
  );
};

export default NotificationSetup;