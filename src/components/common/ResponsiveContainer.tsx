import { ReactNode } from 'react';

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const maxWidthClasses = {
  'sm': 'max-w-sm',
  'md': 'max-w-md', 
  'lg': 'max-w-4xl',
  'xl': 'max-w-6xl',
  '2xl': 'max-w-7xl',
  'full': 'max-w-full'
};

const paddingClasses = {
  'none': '',
  'sm': 'px-4 sm:px-6',
  'md': 'px-4 sm:px-6 lg:px-8', 
  'lg': 'px-4 sm:px-6 lg:px-8 xl:px-12'
};

export function ResponsiveContainer({ 
  children, 
  className = '', 
  maxWidth = 'xl',
  padding = 'md'
}: ResponsiveContainerProps) {
  return (
    <div className={`
      w-full mx-auto 
      ${maxWidthClasses[maxWidth]} 
      ${paddingClasses[padding]}
      ${className}
    `}>
      {children}
    </div>
  );
}
