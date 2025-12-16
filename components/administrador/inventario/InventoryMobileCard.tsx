import Link from 'next/link';
import { Product } from '@/types/product';
import { Badge } from '@/components/ui/Badge';

interface InventoryMobileCardProps {
    product: Product;
}

export const InventoryMobileCard = ({ product }: InventoryMobileCardProps) => {
    const isLowStock = product.quantity <= product.minStock;
    const isExpiring = product.expiryDate && new Date(product.expiryDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    return (
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    {product.expiryDate && (
                        <p className="text-xs text-gray-700 mt-0.5">
                            Vence: {new Date(product.expiryDate).toLocaleDateString()}
                        </p>
                    )}
                    <p className="text-sm text-gray-700 mt-1">{product.category}</p>
                </div>
                <div className="flex flex-col gap-1 items-end">
                    <Badge
                        variant={isLowStock ? "danger" : "default"}
                        className={!isLowStock ? "bg-gray-100 text-gray-800 border-gray-200" : ""}
                    >
                        Stock: {product.quantity}
                    </Badge>
                    <span className="font-medium text-gray-900">${product.salePrice.toFixed(2)}</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3 mb-4">
                {isLowStock && (
                    <Badge variant="danger">Stock Bajo</Badge>
                )}
                {isExpiring && (
                    <Badge variant="warning">Por Caducar</Badge>
                )}
                {!isLowStock && !isExpiring && (
                    <Badge variant="success">OK</Badge>
                )}
            </div>

            <div className="flex justify-end pt-3 border-t border-gray-100">
                <Link
                    href={`/administrador/inventario/${product._id}`}
                    className="text-sm font-medium text-teal-600 hover:text-teal-900"
                >
                    Gestionar
                </Link>
            </div>
        </div>
    );
};
