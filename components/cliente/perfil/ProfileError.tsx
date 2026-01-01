import React from 'react';
import { useTranslations } from 'next-intl';

interface ProfileErrorProps {
    error: string;
    onRetry: () => void;
}

export const ProfileError = ({ error, onRetry }: ProfileErrorProps) => {
    const tc = useTranslations('ClientPanel.common');

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <div className="flex">
                    <div className="flex-shrink-0">⚠️</div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                        <button
                            onClick={onRetry}
                            className="mt-2 text-sm font-medium text-red-700 underline hover:text-red-600"
                        >
                            {tc('retry')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
