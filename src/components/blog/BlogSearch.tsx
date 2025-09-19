import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface BlogSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function BlogSearch({ 
  onSearch, 
  placeholder = "Поиск по статьям...", 
  className = "" 
}: BlogSearchProps) {
  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery('');
    setIsActive(false);
  };

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    if (!query) {
      setIsActive(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`
        relative flex items-center transition-all duration-300 
        ${isActive ? 'transform scale-105' : ''}
      `}>
        <div className="relative flex-1">
          <Icon 
            name="Search" 
            size={20} 
            className={`
              absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200
              ${isActive ? 'text-professional-600' : 'text-gray-400'}
            `}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={`
              w-full pl-12 pr-12 py-3 rounded-xl border transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-professional-500/20
              ${isActive || query 
                ? 'border-professional-300 bg-white shadow-lg' 
                : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300'
              }
              text-gray-900 placeholder-gray-500
            `}
          />
          {query && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
            >
              <Icon name="X" size={16} className="text-gray-400" />
            </Button>
          )}
        </div>
      </div>

      {query && (
        <div className="absolute top-full left-0 right-0 mt-2 text-sm text-gray-600 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 border shadow-sm">
          <div className="flex items-center gap-2">
            <Icon name="Info" size={14} className="text-professional-500" />
            <span>
              Поиск по: <span className="font-medium">заголовкам</span>, <span className="font-medium">содержимому</span> и <span className="font-medium">тегам</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}