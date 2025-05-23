import { ReactNode, ButtonHTMLAttributes } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface ResponsiveButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  loadingText?: string;
  motionProps?: MotionProps;
  touchOptimized?: boolean;
}

const variantClasses = {
  primary: 'bg-red-600 hover:bg-red-700 text-white border-transparent focus:ring-red-500',
  secondary: 'bg-gray-600 hover:bg-gray-700 text-white border-transparent focus:ring-gray-500',
  outline: 'bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 focus:ring-gray-500',
  ghost: 'bg-transparent border-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus:ring-gray-500'
};

const sizeClasses = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
};

const touchOptimizedClasses = 'min-h-[44px] min-w-[44px] touch-manipulation';

export function ResponsiveButton({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  loadingText = 'Cargando...',
  motionProps,
  touchOptimized = true,
  className = '',
  disabled,
}: ResponsiveButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-lg border
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-95
    ${touchOptimized ? touchOptimizedClasses : ''}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const defaultMotionProps: MotionProps = {
    whileHover: { scale: disabled || isLoading ? 1 : 1.02 },
    whileTap: { scale: disabled || isLoading ? 1 : 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
    ...motionProps,
  };

  // Separar props de Motion y props del botón
  // Eliminar props de Motion del objeto de props del botón
  

  return (
    <motion.button
      className={baseClasses}
      disabled={disabled || isLoading}
      {...defaultMotionProps}
      
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {loadingText}
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}
