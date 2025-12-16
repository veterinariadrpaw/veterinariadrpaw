import React from 'react';

export const Card = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`} {...props}>
            {children}
        </div>
    );
};

export const CardHeader = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={`px-6 py-4 border-b border-gray-200 ${className}`} {...props}>
            {children}
        </div>
    );
};

export const CardTitle = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
        <h3 className={`text-lg font-medium leading-6 text-gray-900 ${className}`} {...props}>
            {children}
        </h3>
    );
};

export const CardContent = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={`px-6 py-4 ${className}`} {...props}>
            {children}
        </div>
    );
};

export const CardFooter = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={`px-6 py-4 bg-gray-50 rounded-b-lg border-t border-gray-200 ${className}`} {...props}>
            {children}
        </div>
    );
};
