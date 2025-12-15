import Link from 'next/link';
import React from 'react';
import { Pet } from '@/types/pet';

interface PatientListProps {
    patients: Pet[];
}

export const PatientList = ({ patients = [] }: PatientListProps) => {
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Mascota
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Especie/Raza
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Propietario
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {patients.map((pet) => (
                        <tr key={pet._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{pet.nombre}</div>
                                <div className="text-sm text-gray-500">{pet.edad} años</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{pet.especie}</div>
                                <div className="text-sm text-gray-500">{pet.raza}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{pet.propietario?.name || 'N/A'}</div>
                                <div className="text-sm text-gray-500">{pet.propietario?.email || 'N/A'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <a
                                    href={`/veterinario/mascotas/${pet._id}/historial`}
                                    className="text-indigo-600 hover:text-indigo-900 font-bold"
                                >
                                    Ver Historial
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
