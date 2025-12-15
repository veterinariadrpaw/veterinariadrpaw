import Link from 'next/link';
import React from 'react';
import { Appointment } from '@/types/appointment';

export const RecentActivity = ({ appointments }: { appointments: Appointment[] }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Actividad Reciente (Citas)</h2>
            {appointments.length === 0 ? (
                <p className="text-gray-500">No hay actividad reciente.</p>
            ) : (
                <ul className="space-y-4">
                    {appointments.map((appointment) => (
                        <li key={appointment._id} className="border-b pb-4 last:border-b-0 last:pb-0">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {appointment.pet.nombre} -{" "}
                                        <span className="text-sm text-gray-500">{appointment.pet.especie}</span>
                                    </p>
                                    Cita con <span className="font-bold">{appointment.pet?.nombre || 'Mascota'}</span> ({appointment.status})
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
