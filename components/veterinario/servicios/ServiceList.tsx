import Link from 'next/link';
import React from 'react';
import { Service } from '@/types/service';
import { Card } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { ServiceMobileCard } from './ServiceMobileCard';
import { Pagination } from '@/components/ui/Pagination';
import { usePagination } from '@/hooks/usePagination';

interface ServiceListProps {
    services: Service[];
    onToggleStatus: (id: string) => void;
}

export const ServiceList = ({ services, onToggleStatus }: ServiceListProps) => {
    const {
        paginatedItems: paginatedServices,
        currentPage,
        totalPages,
        totalItems,
        handlePageChange
    } = usePagination(services, 10);

    if (services.length === 0) {
        return (
            <div className="p-6 text-center text-gray-700 bg-white rounded-lg shadow">
                No hay servicios registrados.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Mobile View */}
            <div className="md:hidden space-y-4">
                {paginatedServices.map((service) => (
                    <ServiceMobileCard
                        key={service._id}
                        service={service}
                        onToggleStatus={onToggleStatus}
                    />
                ))}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
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
                        {paginatedServices.map((service) => (
                            <tr key={service._id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 border-b text-gray-800">
                                    <div className="font-medium">{service.name}</div>
                                    <div className="text-sm text-gray-700 truncate max-w-xs">
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
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                onPageChange={handlePageChange}
            />
        </div>
    );
};
