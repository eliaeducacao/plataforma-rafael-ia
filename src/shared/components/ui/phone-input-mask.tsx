import React from 'react';
import { IMaskInput } from 'react-imask';
import { cn } from '@/shared/lib/utils';

interface PhoneInputMaskProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAccept?: (value: string) => void;
  className?: string;
}

export const PhoneInputMask = React.forwardRef<HTMLInputElement, PhoneInputMaskProps>(
  ({ className, onChange, onAccept, ...props }, ref) => {
    return (
      <IMaskInput
        mask="(00) 00000-0000"
        definitions={{
          '0': /[0-9]/,
        }}
        lazy={false}
        placeholderChar="_"
        onAccept={(value: string) => {
          if (onAccept) {
            onAccept(value);
          }
        }}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (onChange) {
            onChange(e);
          }
        }}
        inputRef={ref}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);

PhoneInputMask.displayName = 'PhoneInputMask';
