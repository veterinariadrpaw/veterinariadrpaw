import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Modal = ({ isOpen, onClose, title, children, footer, size = 'md' }: ModalProps) => {
    if (!isOpen) return null;

    const sizes = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        '2xl': "max-w-2xl"
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Panel */}
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className={`relative transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all w-full ${sizes[size]}`}>
                    {/* Header */}
                    <div className="bg-gray-50 px-6 py-5 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold leading-6 text-gray-900" id="modal-title">
                                {title}
                            </h3>
                            <button
                                type="button"
                                className="rounded-lg p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-smooth focus-ring"
                                onClick={onClose}
                            >
                                <span className="sr-only">Cerrar</span>
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-5">
                        {children}
                    </div>

                    {/* Footer */}
                    {footer && (
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

