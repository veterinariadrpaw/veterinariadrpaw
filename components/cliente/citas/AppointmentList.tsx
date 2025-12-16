import Link from 'next/link';
import React from 'react';
import { Appointment } from '@/types/appointment';
import { Card } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AppointmentMobileCard } from './AppointmentMobileCard';
import { Pagination } from '@/components/ui/Pagination';
import { usePagination } from '@/hooks/usePagination';

interface AppointmentListProps {
    appointments: Appointment[];
    onCancel: (id: string) => void;
}

export const AppointmentList = ({ appointments, onCancel }: AppointmentListProps) => {
    const {
        paginatedItems: paginatedAppointments,
        currentPage,
        totalPages,
        totalItems,
        handlePageChange
    } = usePagination(appointments, 10);

    if (appointments.length === 0) {
        return (
            <div className="px-4 py-8 text-center text-gray-500 bg-white rounded-lg shadow">
                <p className="mb-4">No tienes citas programadas.</p>
                <Link
                    href="/cliente/citas/nueva"
                    className="text-teal-600 hover:text-teal-800 font-medium"
                >
                    Solicita tu primera cita →
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Mobile View */}
            <div className="md:hidden space-y-4">
                {paginatedAppointments.map((appointment) => (
                    <AppointmentMobileCard
                        key={appointment._id}
                        appointment={appointment}
                        onCancel={onCancel}
                    />
                ))}
            </div>

            {/* Desktop View */}
            <Card className="hidden md:block overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Fecha y Hora</TableHead>
                            <TableHead>Mascota</TableHead>
                            <TableHead>Veterinario</TableHead>
                            <TableHead>Motivo</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedAppointments.map((appointment) => (
                            <TableRow key={appointment._id}>
                                <TableCell>
                                    <div className="text-sm font-medium text-teal-600">
                                        {new Date(appointment.date).toLocaleDateString('es-ES', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {new Date(appointment.date).toLocaleTimeString('es-ES', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </TableCell>
                                <TableCell className="text-sm text-gray-500">
                                    {appointment.pet?.nombre || 'Desconocida'}
                                </TableCell>
                                <TableCell className="text-sm text-gray-500">
                                    {appointment.veterinarian?.name || 'Por asignar'}
                                </TableCell>
                                <TableCell className="text-sm text-gray-500 max-w-xs truncate">
                                    {appointment.reason}
                                    {appointment.notas && appointment.status === 'completada' && (
                                        <div className="mt-1 text-xs text-gray-400 italic">
                                            Notas: {appointment.notas}
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            appointment.status === 'aceptada' ? 'success' :
                                                appointment.status === 'cancelada' ? 'danger' :
                                                    appointment.status === 'completada' ? 'info' : 'warning'
                                        }
                                    >
                                        {appointment.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
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
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                onPageChange={handlePageChange}
            />
        </div>
    );
};
