'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
    id: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    id,
    checked,
    onCheckedChange,
    disabled = false
}) => {
    return (
        <div
            className={`
        relative flex items-center justify-center
        w-5 h-5 border-2 rounded-sm
        transition-all duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${checked
                    ? 'bg-purple-600 border-purple-600'
                    : 'border-gray-400 hover:border-purple-400'}
      `}

            onClick={() => !disabled && onCheckedChange(!checked)}
        >
            {checked && (
                <Check className="w-4 h-4 text-white" />
            )}
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={() => { }} // Required for controlled component
                className="sr-only"
                disabled={disabled}
                aria-label={disabled ? 'Disabled checkbox' : 'Checkbox'}
            />
        </div>
    );
};