import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'scale-in' | 'slide-left' | 'slide-right';
  delay?: number;
  threshold?: number;
}

const animationClasses = {
  'fade-up': 'translate-y-8 opacity-0',
  'fade-in': 'opacity-0',
  'scale-in': 'scale-95 opacity-0',
  'slide-left': 'translate-x-8 opacity-0',
  'slide-right': '-translate-x-8 opacity-0',
};

const visibleClasses = {
  'fade-up': 'translate-y-0 opacity-100',
  'fade-in': 'opacity-100',
  'scale-in': 'scale-100 opacity-100',
  'slide-left': 'translate-x-0 opacity-100',
  'slide-right': 'translate-x-0 opacity-100',
};

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible ? visibleClasses[animation] : animationClasses[animation],
        className
      )}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;