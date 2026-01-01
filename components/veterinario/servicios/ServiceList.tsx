import Link from 'next/link';
import React from 'react';
import { Service } from '@/types/service';
import { ServiceMobileCard } from './ServiceMobileCard';
import { Pagination } from '@/components/ui/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { useTranslations } from 'next-intl';

interface ServiceListProps {
    services: Service[];
    onToggleStatus: (id: string) => void;
}

export const ServiceList = ({ services, onToggleStatus }: ServiceListProps) => {
    const t = useTranslations('VetPanel.services');
    const tc = useTranslations('ClientPanel.common');

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
                {t('noServices')}
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
                            <th className="py-3 px-4 border-b font-semibold text-gray-700">{t('table.name')}</th>
                            <th className="py-3 px-4 border-b font-semibold text-gray-700">{t('table.basePrice')}</th>
                            <th className="py-3 px-4 border-b font-semibold text-gray-700">{t('table.duration')}</th>
                            <th className="py-3 px-4 border-b font-semibold text-gray-700">{t('table.supplies')}</th>
                            <th className="py-3 px-4 border-b font-semibold text-gray-700">{t('table.status')}</th>
                            <th className="py-3 px-4 border-b font-semibold text-gray-700">{tc('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedServices.map((service) => (
                            <tr key={service._id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 border-b text-gray-800">
                                    <div className="font-medium text-black">{service.name}</div>
                                    <div className="text-sm text-gray-700 truncate max-w-xs">
                                        {service.description}
                                    </div>
                                </td>
                                <td className="py-3 px-4 border-b text-black">
                                    ${service.basePrice.toFixed(2)}
                                </td>
                                <td className="py-3 px-4 border-b text-black">
                                    {service.duration}
                                </td>
                                <td className="py-3 px-4 border-b text-black">
                                    {service.supplies?.length || 0}
                                </td>
                                <td className="py-3 px-4 border-b">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${service.isActive
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {service.isActive ? t('status.active') : t('status.inactive')}
                                    </span>
                                </td>
                                <td className="py-3 px-4 border-b space-x-2">
                                    <Link
                                        href={`/veterinario/servicios/editar/${service._id}`}
                                        className="text-blue-600 hover:underline font-bold"
                                    >
                                        {tc('edit')}
                                    </Link>
                                    <button
                                        onClick={() => onToggleStatus(service._id)}
                                        className={`text-sm hover:underline font-bold ${service.isActive ? "text-red-600" : "text-green-600"
                                            }`}
                                    >
                                        {service.isActive ? t('actions.deactivate') : t('actions.activate')}
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
