import Link from 'next/link';
import React from 'react';
import { Service } from '@/types/service';

interface ServiceListProps {
    services: Service[];
    onToggleStatus: (id: string) => void;
}

export const ServiceList = ({ services, onToggleStatus }: ServiceListProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-50 text-left">
                        <th className="py-3 px-4 border-b font-semibold text-gray-700">Nombre</th>
                        <th className="py-3 px-4 border-b font-semibold text-gray-700">Precio Base</th>
                        <th className="py-3 px-4 border-b font-semibold text-gray-700">Duración (min)</th>
                        <th className="py-3 px-4 border-b font-semibold text-gray-700">Insumos</th>
                        <th className="py-3 px-4 border-b font-semibold text-gray-700">Estado</th>
                        <th className="py-3 px-4 border-b font-semibold text-gray-700">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {services.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="py-4 px-4 text-center text-gray-500">
                                No hay servicios registrados.
                            </td>
                        </tr>
                    ) : (
                        services.map((service) => (
                            <tr key={service._id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 border-b text-gray-800">
                                    <div className="font-medium">{service.name}</div>
                                    <div className="text-sm text-gray-500 truncate max-w-xs">
                                        {service.description}
                                    </div>
                                </td>
                                <td className="py-3 px-4 border-b text-gray-800">
                                    ${service.basePrice.toFixed(2)}
                                </td>
                                <td className="py-3 px-4 border-b text-gray-800">
                                    {service.duration}
                                </td>
                                <td className="py-3 px-4 border-b text-gray-800">
                                    {service.supplies?.length || 0}
                                </td>
                                <td className="py-3 px-4 border-b">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${service.isActive
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {service.isActive ? "Activo" : "Inactivo"}
                                    </span>
                                </td>
                                <td className="py-3 px-4 border-b space-x-2">
                                    <Link
                                        href={`/veterinario/servicios/editar/${service._id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => onToggleStatus(service._id)}
                                        className={`text-sm hover:underline ${service.isActive ? "text-red-600" : "text-green-600"
                                            }`}
                                    >
                                        {service.isActive ? "Desactivar" : "Activar"}
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};
