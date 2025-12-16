import Link from 'next/link';
import React from 'react';
import { Appointment } from '@/types/appointment';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface AppointmentListProps {
    appointments: Appointment[];
    onCancel: (id: string) => void;
}

export const AppointmentList = ({ appointments, onCancel }: AppointmentListProps) => {


    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
                {appointments.map((appointment) => (
                    <li key={appointment._id}>
                        <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-teal-600 truncate">
                                        {new Date(appointment.date).toLocaleDateString('es-ES', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })} - {new Date(appointment.date).toLocaleTimeString('es-ES', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                                <div className="ml-2 flex-shrink-0 flex items-center gap-2">
                                    <Badge
                                        variant={
                                            appointment.status === 'aceptada' ? 'success' :
                                                appointment.status === 'cancelada' ? 'danger' :
                                                    appointment.status === 'completada' ? 'info' : 'warning'
                                        }
                                    >
                                        {appointment.status}
                                    </Badge>
                                    {appointment.status === 'pendiente' && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onCancel(appointment._id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Cancelar
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                    <p className="flex items-center text-sm text-gray-500">
                                        🐾 Mascota: {appointment.pet?.nombre || 'Desconocida'}
                                    </p>
                                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                        👨‍⚕️ Veterinario: {appointment.veterinarian?.name || 'Por asignar'}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                <p>
                                    📝 Motivo: {appointment.reason}
                                </p>
                            </div>
                            {appointment.notas && appointment.status === 'completada' && (
                                <div className="mt-2 p-3 bg-blue-50 rounded border border-blue-200">
                                    <p className="text-sm text-gray-700">
                                        <strong>Notas del veterinario:</strong> {appointment.notas}
                                    </p>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
                {appointments.length === 0 && (
                    <li className="px-4 py-8 text-center text-gray-500">
                        <p className="mb-4">No tienes citas programadas.</p>
                        <Link
                            href="/cliente/citas/nueva"
                            className="text-teal-600 hover:text-teal-800 font-medium"
                        >
                            Solicita tu primera cita →
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};
