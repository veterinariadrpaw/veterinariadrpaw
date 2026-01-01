import React from 'react';

export const Card = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={`bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-smooth hover:shadow-lg ${className}`} {...props}>
            {children}
        </div>
    );
};

export const CardHeader = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={`px-6 py-5 border-b border-gray-200 bg-gray-50 ${className}`} {...props}>
            {children}
        </div>
    );
};

export const CardTitle = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
        <h3 className={`text-lg font-semibold leading-6 text-gray-900 ${className}`} {...props}>
            {children}
        </h3>
    );
};

export const CardDescription = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
    return (
        <p className={`mt-1 text-sm text-gray-600 ${className}`} {...props}>
            {children}
        </p>
    );
};

export const CardContent = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={`px-6 py-5 ${className}`} {...props}>
            {children}
        </div>
    );
};

export const CardFooter = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={`px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-4 ${className}`} {...props}>
            {children}
        </div>
    );
};

