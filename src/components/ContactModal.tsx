import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: string;
  title?: string;
}

interface ContactFormData {
  name: string;
  contact: string;
  service: string;
  urgency: string;
  message: string;
}

export default function ContactModal({ isOpen, onClose, service = '', title = 'Быстрая связь' }: ContactModalProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    contact: '',
    service: service || 'Авторские права',
    urgency: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Отправляем в Telegram
      const response = await fetch('https://functions.poehali.dev/75ac2973-1391-4cba-beaf-6d4d7549055b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toLocaleString('ru-RU')
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Сброс формы и закрытие модального окна
        setFormData({
          name: '',
          contact: '',
          service: service || 'Авторские права',
          urgency: '',
          message: ''
        });
        onClose();
        alert('Спасибо! Ваша заявка отправлена в Telegram. Свяжемся с вами в течение часа.');
      } else {
        throw new Error(result.error || 'Ошибка отправки');
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
      
      // Более информативные сообщения об ошибках
      if (error instanceof Error) {
        if (error.message.includes('Заполните все обязательные поля')) {
          alert('⚠️ Заполните все обязательные поля: имя, контакт и услуга');
        } else if (error.message.includes('Доступна только тема')) {
          alert('⚠️ Сейчас доступна только услуга "Авторские права"');
        } else if (error.message.includes('TELEGRAM_BOT_TOKEN')) {
          alert('⚙️ Настройки уведомлений еще не готовы. Свяжитесь с нами напрямую.');
        } else {
          alert('❌ Произошла ошибка при отправке заявки. Попробуйте еще раз или свяжитесь с нами напрямую.');
        }
      } else {
        alert('❌ Произошла ошибка при отправке заявки. Попробуйте еще раз или свяжитесь с нами напрямую.');
      }
    }
    
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-trust-900">
            <Icon name="MessageCircle" className="text-professional-600" size={24} />
            {title}
          </DialogTitle>
          <DialogDescription className="text-trust-600">
            Заполните форму — и мы свяжемся с вами в течение часа
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="modal-name" className="text-trust-800">Ваше имя *</Label>
            <Input
              id="modal-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1"
              placeholder="Как к вам обращаться?"
              required
            />
          </div>

          <div>
            <Label htmlFor="modal-contact" className="text-trust-800">Телефон или Telegram *</Label>
            <Input
              id="modal-contact"
              value={formData.contact}
              onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
              className="mt-1"
              placeholder="+7 (xxx) xxx-xx-xx или @username"
              required
            />
          </div>

          <div>
            <Label htmlFor="modal-service" className="text-trust-800">Интересующая услуга</Label>
            <Select 
              value={formData.service} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Выберите услугу" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Авторские права">Авторские права</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="modal-urgency" className="text-trust-800">Срочность</Label>
            <Select 
              value={formData.urgency} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Когда нужен ответ?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Срочно">Срочно — в течение часа</SelectItem>
                <SelectItem value="Сегодня">Сегодня</SelectItem>
                <SelectItem value="Завтра">Завтра</SelectItem>
                <SelectItem value="Неделя">В течение недели</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="modal-message" className="text-trust-800">Кратко о ситуации</Label>
            <Textarea
              id="modal-message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className="mt-1"
              placeholder="За что требуют деньги? Какая сумма? (необязательно)"
              rows={3}
            />
          </div>

          <div className="bg-professional-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Icon name="Clock" className="text-professional-600 mt-1 flex-shrink-0" size={16} />
              <div className="text-sm">
                <p className="font-medium text-professional-700 mb-1">Гарантия ответа</p>
                <p className="text-trust-600">Отвечаем в течение часа в рабочее время (9:00-21:00 МСК)</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-professional-600 hover:bg-professional-700"
            >
              {isSubmitting ? (
                <>
                  <Icon name="Loader2" className="mr-2 animate-spin" size={16} />
                  Отправляем...
                </>
              ) : (
                <>
                  <Icon name="Send" className="mr-2" size={16} />
                  Отправить
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}