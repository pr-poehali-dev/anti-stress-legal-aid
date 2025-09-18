export interface ValidationResult {
  token_valid: boolean;
  chat_id_valid: boolean;
  bot_info?: any;
  errors: string[];
  suggestions: string[];
  qr_data?: string;
}

export interface ChatIdResult {
  chat_ids: string[];
  chat_info: Record<string, any>;
  total_found: number;
  instruction: string;
  suggestion?: string;
}

export interface NotificationSetupState {
  currentStep: number;
  botToken: string;
  chatId: string;
  emailUser: string;
  emailPassword: string;
  recipientEmail: string;
  validationResult: ValidationResult | null;
  chatIdResult: ChatIdResult | null;
  isValidating: boolean;
  isSearchingChats: boolean;
  isTestingEmail: boolean;
}

export interface StepProps {
  state: NotificationSetupState;
  setState: React.Dispatch<React.SetStateAction<NotificationSetupState>>;
  nextStep: () => void;
  prevStep: () => void;
  validateTelegram: () => Promise<void>;
  findChatIds: () => Promise<void>;
  testEmailBackup: () => Promise<void>;
}