import Link from 'next/link';
import React from 'react';
import { Appointment } from '@/types/appointment';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export const RecentActivity = ({ appointments }: { appointments: Appointment[] }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Actividad Reciente (Citas)</CardTitle>
            </CardHeader>
            <CardContent>
                {appointments.length === 0 ? (
                    <p className="text-gray-500">No hay actividad reciente.</p>
                ) : (
                    <ul className="space-y-4">
                        {appointments.map((appointment) => (
                            <li key={appointment._id} className="border-b pb-4 last:border-b-0 last:pb-0">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {appointment.pet?.nombre || 'Mascota eliminada'} -{" "}
                                            <span className="text-sm text-gray-500">{appointment.pet?.especie || 'N/A'}</span>
                                        </p>
                                        Cita con <span className="font-bold">{appointment.pet?.nombre || 'Mascota'}</span> ({appointment.status})
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
