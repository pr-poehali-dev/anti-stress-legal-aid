import { useState } from 'react';
import Icon from '@/components/ui/icon';

export default function AIAgent() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAgent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Кнопка для открытия агента */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleAgent}
          className="bg-professional-600 hover:bg-professional-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Открыть ИИ помощника"
        >
          <Icon name="MessageCircle" size={24} />
        </button>
      </div>

      {/* Модальное окно с агентом */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[80vh] relative overflow-hidden">
            {/* Заголовок */}
            <div className="flex items-center justify-between p-4 border-b bg-professional-50">
              <h3 className="text-lg font-semibold text-trust-900">
                ИИ Помощник по правовым вопросам
              </h3>
              <button
                onClick={toggleAgent}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Закрыть"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            {/* Iframe с агентом */}
            <div className="h-full">
              <iframe
                allow="microphone;autoplay"
                style={{ width: '100%', height: 'calc(100% - 73px)' }}
                src="https://functions.pro-talk.ru/api/v1.0/chatgpt_widget_dialog_api?record_id=recBsFLTIDoQiwqnv&promt_id=36174&lang=ru&fullscreen=0&voice=1&file=1&circle=1"
                title="ИИ Помощник"
                className="border-0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}