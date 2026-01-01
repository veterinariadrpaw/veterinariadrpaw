import Link from 'next/link';
import { Product } from '@/types/product';
import { Badge } from '@/components/ui/Badge';
import { useTranslations } from 'next-intl';

interface InventoryMobileCardProps {
    product: Product;
}

export const InventoryMobileCard = ({ product }: InventoryMobileCardProps) => {
    const t = useTranslations('AdminDashboard.inventory');
    const isLowStock = product.quantity <= product.minStock;
    const isExpiring = product.expiryDate && new Date(product.expiryDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    return (
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="font-bold text-gray-900">{product.name}</h3>
                    {product.expiryDate && (
                        <p className="text-xs text-gray-700 mt-0.5 font-bold">
                            {t('table.expires', { date: new Date(product.expiryDate).toLocaleDateString() })}
                        </p>
                    )}
                    <p className="text-sm text-gray-700 mt-1 font-bold">{product.category}</p>
                </div>
                <div className="flex flex-col gap-1 items-end">
                    <Badge
                        variant={isLowStock ? "danger" : "default"}
                        className={!isLowStock ? "bg-gray-100 text-gray-800 border-gray-200" : ""}
                    >
                        {t('table.stock')}: {product.quantity}
                    </Badge>
                    <span className="font-bold text-gray-900">${product.salePrice.toFixed(2)}</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3 mb-4">
                {isLowStock && (
                    <Badge variant="danger">{t('status.lowStock')}</Badge>
                )}
                {isExpiring && (
                    <Badge variant="warning">{t('status.expiring')}</Badge>
                )}
                {!isLowStock && !isExpiring && (
                    <Badge variant="success">{t('status.ok')}</Badge>
                )}
            </div>

            <div className="flex justify-end pt-3 border-t border-gray-100">
                <Link
                    href={`/administrador/inventario/${product._id}`}
                    className="text-sm font-bold text-teal-600 hover:text-teal-900"
                >
                    {t('manage')}
                </Link>
            </div>
        </div>
    );
};
