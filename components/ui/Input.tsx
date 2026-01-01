import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', label, error, icon, id, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={id}
                        className={`block w-full rounded-lg border ${error
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:border-teal-500 focus:ring-teal-500'
                            } h-10 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-smooth disabled:bg-gray-100 disabled:cursor-not-allowed sm:text-sm ${icon ? 'pl-10' : ''
                            } ${className}`}
                        {...props}
                    />
                </div>
                {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
            </div>
        );
    }
);
Input.displayName = "Input";

