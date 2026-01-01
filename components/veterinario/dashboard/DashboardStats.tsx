import React from 'react';
import { VetDashboardStats } from '@/types/dashboard';
import { Card, CardContent } from '@/components/ui/Card';
import { useTranslations } from 'next-intl';

export const DashboardStats = ({ stats }: { stats: VetDashboardStats }) => {
    const t = useTranslations('VetPanel.dashboard.stats');

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-l-4 border-indigo-500">
                <CardContent className="p-6">
                    <h3 className="text-gray-700 text-sm font-medium uppercase">{t('appointmentsToday')}</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.appointmentsToday}</p>
                </CardContent>
            </Card>
            <Card className="border-l-4 border-green-500">
                <CardContent className="p-6">
                    <h3 className="text-gray-700 text-sm font-medium uppercase">{t('activePatients')}</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activePatients}</p>
                </CardContent>
            </Card>
            <Card className="border-l-4 border-yellow-500">
                <CardContent className="p-6">
                    <h3 className="text-gray-700 text-sm font-medium uppercase">{t('pendingAppointments')}</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pendingAppointments}</p>
                </CardContent>
            </Card>
        </div>
    );
};
