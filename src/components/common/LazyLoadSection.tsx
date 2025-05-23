import { ReactNode } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface LazyLoadSectionProps {
  children: ReactNode;
  className?: string;
  triggerOnce?: boolean;
  threshold?: number;
  rootMargin?: string;
  animationType?: 'fade' | 'slide-up' | 'slide-in' | 'scale';
}

const animationClasses = {
  'fade': {
    hidden: 'opacity-0',
    visible: 'opacity-100 transition-opacity duration-700 ease-out'
  },
  'slide-up': {
    hidden: 'opacity-0 translate-y-8',
    visible: 'opacity-100 translate-y-0 transition-all duration-700 ease-out'
  },
  'slide-in': {
    hidden: 'opacity-0 translate-x-8',
    visible: 'opacity-100 translate-x-0 transition-all duration-700 ease-out'
  },
  'scale': {
    hidden: 'opacity-0 scale-95',
    visible: 'opacity-100 scale-100 transition-all duration-700 ease-out'
  }
};

export function LazyLoadSection({
  children,
  className = '',
  triggerOnce = true,
  threshold = 0.1,
  rootMargin = '50px',
  animationType = 'fade'
}: LazyLoadSectionProps) {
  const { elementRef, isVisible } = useIntersectionObserver({
    triggerOnce,
    threshold,
    rootMargin,
  });

  const animation = animationClasses[animationType];

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`
        ${isVisible ? animation.visible : animation.hidden}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
