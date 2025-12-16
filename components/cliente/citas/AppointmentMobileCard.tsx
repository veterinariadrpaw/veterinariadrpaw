import Link from 'next/link';
import { Appointment } from '@/types/appointment';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface AppointmentMobileCardProps {
    appointment: Appointment;
    onCancel: (id: string) => void;
}

export const AppointmentMobileCard = ({ appointment, onCancel }: AppointmentMobileCardProps) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <Badge
                        variant={
                            appointment.status === 'aceptada' ? 'success' :
                                appointment.status === 'cancelada' ? 'danger' :
                                    appointment.status === 'completada' ? 'info' : 'warning'
                        }
                        className="mb-1"
                    >
                        {appointment.status}
                    </Badge>
                    <h3 className="font-semibold text-teal-600">
                        {new Date(appointment.date).toLocaleDateString('es-ES', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {new Date(appointment.date).toLocaleTimeString('es-ES', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-2 mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Mascota</span>
                    <span className="font-medium">{appointment.pet?.nombre || 'Desconocida'}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Veterinario</span>
                    <span className="font-medium">{appointment.veterinarian?.name || 'Por asignar'}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Motivo</span>
                    <span className="italic">{appointment.reason}</span>
                </div>
            </div>

            {appointment.notas && appointment.status === 'completada' && (
                <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200 text-sm">
                    <p className="text-gray-700">
                        <strong>Notas del veterinario:</strong> {appointment.notas}
                    </p>
                </div>
            )}

            {appointment.status === 'pendiente' && (
                <div className="flex justify-end mt-4 pt-3 border-t border-gray-100">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onCancel(appointment._id)}
                        className="text-red-600 hover:text-red-800 w-full justify-center"
                    >
                        Cancelar Cita
                    </Button>
                </div>
            )}
        </div>
    );
};
