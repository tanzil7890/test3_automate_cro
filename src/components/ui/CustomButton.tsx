import React from 'react';
import { Button as ShadcnButton } from './button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomButtonProps extends React.ComponentProps<typeof ShadcnButton> {
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ children, className, isLoading, fullWidth, disabled, ...props }, ref) => {
    return (
      <ShadcnButton
        className={cn(className, { 'w-full': fullWidth })}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </ShadcnButton>
    );
  }
);

Button.displayName = 'Button';

export default Button; 