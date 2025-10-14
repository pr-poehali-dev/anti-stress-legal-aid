import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-professional-50 p-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center border-2 border-red-200">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-trust-900 mb-4">
              Произошла ошибка
            </h1>
            <p className="text-trust-600 mb-6">
              Что-то пошло не так при загрузке страницы. Попробуйте обновить страницу.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-professional-600 hover:bg-professional-700 w-full"
            >
              Обновить страницу
            </Button>
            {this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-trust-500 hover:text-trust-700">
                  Технические детали
                </summary>
                <pre className="mt-2 text-xs bg-slate-100 p-3 rounded overflow-auto text-left">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
