import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';

interface Liability {
    _id: string;
    type: 'PRESTAMO' | 'OBLIGACION';
    description: string;
    amount: number;
    startDate: string;
    interestRate: number;
    termMonths: number;
    amountPaid: number;
    status: 'ACTIVO' | 'PAGADO';
    pendingAmount: number;
    monthlyPayment: number;
}

interface LiabilityMobileCardProps {
    liability: Liability;
    onDelete: (id: string) => void;
}

export const LiabilityMobileCard = ({ liability, onDelete }: LiabilityMobileCardProps) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <Badge variant={liability.type === 'PRESTAMO' ? 'info' : 'default'} className="mb-1">
                        {liability.type}
                    </Badge>
                    <h3 className="font-semibold text-gray-900">{liability.description}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                        Inicio: {new Date(liability.startDate).toLocaleDateString()}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold text-red-600">${liability.pendingAmount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Pendiente</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Monto Original</span>
                    <span className="font-medium">${liability.amount.toLocaleString()}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Interés</span>
                    <span className="font-medium">{liability.interestRate}%</span>
                </div>
                <div className="flex flex-col mt-2">
                    <span className="text-xs text-gray-500">Pago Mensual</span>
                    <span className="font-medium text-gray-900">${liability.monthlyPayment.toLocaleString()}</span>
                </div>
                <div className="flex flex-col mt-2">
                    <span className="text-xs text-gray-500">Plazo</span>
                    <span className="font-medium">{liability.termMonths} meses</span>
                </div>

                <div className="flex flex-col col-span-2 mt-2 pt-2 border-t border-gray-200 items-center">
                    <Badge variant={liability.status === 'ACTIVO' ? 'warning' : 'success'}>
                        {liability.status}
                    </Badge>
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-gray-100">
                <Link
                    href={`/administrador/pasivos/${liability._id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                    Editar
                </Link>
                <button
                    onClick={() => onDelete(liability._id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none"
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};
