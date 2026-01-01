import Link from 'next/link';
import React from 'react';
import { useTranslations } from 'next-intl';

export const ProfileHeader = () => {
    const t = useTranslations('AdminDashboard.profile');
    const tp = useTranslations('ClientPanel.profile');

    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{t('title')}</h1>
            <div className="flex gap-3">
                <Link
                    href="/administrador/perfil/editar"
                    className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors text-sm font-bold"
                >
                    {tp('editProfile')}
                </Link>
                <Link
                    href="/administrador/perfil/cambiar-contrasena"
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm font-bold"
                >
                    {tp('changePassword')}
                </Link>
            </div>
        </div>
    );
};
