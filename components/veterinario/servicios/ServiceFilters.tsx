import React from 'react';
import { useTranslations } from 'next-intl';

interface ServiceFiltersProps {
    showActiveOnly: boolean;
    setShowActiveOnly: (value: boolean) => void;
}

export const ServiceFilters = ({ showActiveOnly, setShowActiveOnly }: ServiceFiltersProps) => {
    const t = useTranslations('VetPanel.services.filters');

    return (
        <div className="mb-4">
            <label className="flex items-center space-x-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={showActiveOnly}
                    onChange={(e) => setShowActiveOnly(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-gray-700">{t('showActiveOnly')}</span>
            </label>
        </div>
    );
};
