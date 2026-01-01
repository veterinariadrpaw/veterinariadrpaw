import React from 'react';
import { useTranslations } from 'next-intl';

export interface Profile {
    name: string;
    email: string;
    role: string;
    telefono: string;
    direccion: string;
}

export const ProfileInfo = ({ profile }: { profile: Profile }) => {
    const t = useTranslations('VetPanel.profile');
    const tp = useTranslations('ClientPanel.profile');

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-black">{t('personalInfo')}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-700">{t('subtitle')}</p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-700">{t('fullName')}</dt>
                        <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2">{profile.name || tp('notAvailable')}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-700">{t('emailLabel')}</dt>
                        <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2">{profile.email || tp('notAvailable')}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-700">{t('phone')}</dt>
                        <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2">
                            {profile.telefono || tp('notRegistered')}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-700">{t('address')}</dt>
                        <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2">
                            {profile.direccion || tp('notRegisteredFem')}
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-700">{t('position')}</dt>
                        <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2 capitalize">{profile.role || tp('notAvailable')}</dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};
