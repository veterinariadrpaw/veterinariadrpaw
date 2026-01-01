import React from 'react';
import { Profile } from '@/types/user';
import { useTranslations } from 'next-intl';

export const ProfileInfo = ({ profile }: { profile: Profile }) => {
    const t = useTranslations('AdminDashboard.profile');
    const tp = useTranslations('ClientPanel.profile');

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-bold text-gray-900">{t('personalInfo')}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-700 font-bold">{t('subtitle')}</p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-700">{tp('fullName')}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-bold">{profile.name || tp('notAvailable')}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-700">{tp('emailLabel')}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-bold">{profile.email || tp('notAvailable')}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-700">{tp('phone')}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-bold">
                            {profile.telefono || tp('notRegistered')}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-700">{tp('address')}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-bold">
                            {profile.direccion || tp('notRegisteredFem')}
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-700">{tp('role')}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize font-bold">{profile.role || tp('notAvailable')}</dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};
