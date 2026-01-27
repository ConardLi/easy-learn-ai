import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ChalkTextProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  color?: 'white' | 'yellow' | 'blue' | 'red' | 'green';
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '4xl';
}

export const ChalkText: React.FC<ChalkTextProps> = ({ 
  as: Component = 'p', 
  color = 'white', 
  size = 'base',
  className,
  children,
  ...props 
}) => {
  const colorClasses = {
    white: 'text-gray-100',
    yellow: 'text-yellow-300',
    blue: 'text-blue-300',
    red: 'text-red-300',
    green: 'text-green-300',
  };

  const sizeClasses = {
    sm: 'text-lg',
    base: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl md:text-5xl',
    '2xl': 'text-5xl md:text-7xl',
    '4xl': 'text-6xl md:text-9xl',
  };

  return (
    // @ts-ignore - Dynamic component typing is tricky but safe here
    <Component 
      className={twMerge(
        clsx(
          colorClasses[color],
          sizeClasses[size],
          'drop-shadow-md tracking-wide',
          className
        )
      )}
      {...props}
    >
      {children}
    </Component>
  );
};