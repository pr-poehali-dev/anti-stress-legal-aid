import React from 'react';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import Icon from '../ui/icon';

interface StepHeaderProps {
  currentStep: number;
  totalSteps: number;
}

const StepHeader: React.FC<StepHeaderProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

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
    <>
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
    </>
  );
};

export default StepHeader;