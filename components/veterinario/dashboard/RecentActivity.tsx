import React from 'react';
import { Appointment } from '@/types/appointment';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useTranslations } from 'next-intl';

export const RecentActivity = ({ appointments }: { appointments: Appointment[] }) => {
    const t = useTranslations('VetPanel.dashboard.recentActivity');

    const getStatusKey = (status: string) => {
        switch (status) {
            case 'pendiente': return 'status.pending';
            case 'aceptada': return 'status.accepted';
            case 'cancelada': return 'status.cancelled';
            case 'completada': return 'status.completed';
            default: return status;
        }
    };

    return (
        <Card className="text-black">
            <CardHeader>
                <CardTitle className="text-black">{t('title')}</CardTitle>
            </CardHeader>
            <CardContent>
                {appointments.length === 0 ? (
                    <p className="text-gray-800">{t('noActivity')}</p>
                ) : (
                    <ul className="space-y-4">
                        {appointments.map((appointment) => (
                            <li key={appointment._id} className="border-b pb-4 last:border-b-0 last:pb-0">
                                <div className="flex justify-between items-start text-gray-800">
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {appointment.pet?.nombre || t('deletedPet')} -{" "}
                                            <span className="text-sm text-gray-500">{appointment.pet?.especie || 'N/A'}</span>
                                        </p>
                                        <div className="text-black">
                                            {t('appointmentWith')}{' '}
                                            <span className="font-bold text-blue-500">
                                                {appointment.pet?.nombre || t('deletedPet')}
                                            </span>{' '}
                                            (
                                            <span
                                                className={`font-semibold capitalize
                                                    ${appointment.status === 'cancelada' ? 'text-red-600' : ''}
                                                    ${appointment.status === 'aceptada' ? 'text-green-600' : ''}
                                                    ${appointment.status === 'completada' ? 'text-blue-600' : ''}
                                                    ${appointment.status === 'pendiente' ? 'text-yellow-600' : ''}
                                                `}
                                            >
                                                {t(getStatusKey(appointment.status))}
                                            </span>
                                            )
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
};
