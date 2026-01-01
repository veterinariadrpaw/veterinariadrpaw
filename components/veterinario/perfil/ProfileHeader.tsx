import Link from 'next/link';
import React from 'react';
import { useTranslations } from 'next-intl';

export const ProfileHeader = () => {
    const t = useTranslations('VetPanel.profile');

    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{t('title')}</h1>
            <div className="flex gap-3">
                <Link
                    href="/veterinario/perfil/editar"
                    className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors text-sm font-bold"
                >
                    {t('editProfile')}
                </Link>
                <Link
                    href="/veterinario/perfil/cambiar-contrasena"
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm font-bold"
                >
                    {t('changePassword')}
                </Link>
            </div>
        </div>
    );
};
