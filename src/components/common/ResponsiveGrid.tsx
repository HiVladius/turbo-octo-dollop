import { ReactNode } from 'react';

interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;
  cols?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

const gapClasses = {
  'sm': 'gap-3 sm:gap-4',
  'md': 'gap-4 sm:gap-6',
  'lg': 'gap-6 sm:gap-8 md:gap-10', 
  'xl': 'gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20'
};

export function ResponsiveGrid({ 
  children, 
  className = '', 
  cols = { base: 1, sm: 2, md: 2, lg: 3, xl: 4 },
  gap = 'md'
}: ResponsiveGridProps) {
  
  const getGridColsClass = () => {
    const classes = [];
    
    if (cols.base) classes.push(`grid-cols-${cols.base}`);
    if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);
    
    return classes.join(' ');
  };

  return (
    <div className={`
      grid 
      ${getGridColsClass()}
      ${gapClasses[gap]}
      ${className}
    `}>
      {children}
    </div>
  );
}
