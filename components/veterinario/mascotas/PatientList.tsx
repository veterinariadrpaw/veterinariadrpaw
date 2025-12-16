import Link from 'next/link';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Pet } from '@/types/pet';

interface PatientListProps {
    patients: Pet[];
}

export const PatientList = ({ patients = [] }: PatientListProps) => {
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Mascota</TableHead>
                        <TableHead>Especie/Raza</TableHead>
                        <TableHead>Propietario</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {patients.map((pet) => (
                        <TableRow key={pet._id}>
                            <TableCell className="whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{pet.nombre}</div>
                                <div className="text-sm text-gray-500">{pet.edad} años</div>
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                                <div className="text-sm text-gray-900">{pet.especie}</div>
                                <div className="text-sm text-gray-500">{pet.raza}</div>
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                                <div className="text-sm text-gray-900">{pet.propietario?.name || 'N/A'}</div>
                                <div className="text-sm text-gray-500">{pet.propietario?.email || 'N/A'}</div>
                            </TableCell>
                            <TableCell className="whitespace-nowrap text-sm font-medium">
                                <Link
                                    href={`/veterinario/mascotas/${pet._id}/historial`}
                                    className="text-indigo-600 hover:text-indigo-900 font-bold"
                                >
                                    Ver Historial
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
