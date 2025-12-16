import Link from 'next/link';
import { Service } from '@/types/service';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ServiceMobileCardProps {
    service: Service;
    onToggleStatus: (id: string) => void;
}

export const ServiceMobileCard = ({ service, onToggleStatus }: ServiceMobileCardProps) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="font-semibold text-gray-900">{service.name}</h3>
                    <p className="text-sm text-gray-700 mt-1 line-clamp-2">{service.description}</p>
                </div>
                <Badge variant={service.isActive ? "success" : "danger"}>
                    {service.isActive ? "Activo" : "Inactivo"}
                </Badge>
            </div>

            <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-700">Precio Base</span>
                    <span className="font-medium text-gray-900">${service.basePrice.toFixed(2)}</span>
                </div>
                <div className="flex flex-col text-right">
                    <span className="text-xs text-gray-700">Duración</span>
                    <span className="font-medium text-gray-900">{service.duration} min</span>
                </div>
                <div className="flex flex-col text-right">
                    <span className="text-xs text-gray-700">Insumos</span>
                    <span className="font-medium text-gray-900">{service.supplies?.length || 0}</span>
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-gray-100">
                <Link
                    href={`/administrador/servicios/editar/${service._id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                    Editar
                </Link>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleStatus(service._id)}
                    className={service.isActive ? "text-red-600 hover:text-red-900" : "text-green-600 hover:text-green-900"}
                >
                    {service.isActive ? "Desactivar" : "Activar"}
                </Button>
            </div>
        </div>
    );
};
