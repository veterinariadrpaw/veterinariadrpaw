import Link from 'next/link';
import React from 'react';
import { Product } from '@/types/product';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Card } from '@/components/ui/Card';
import { InventoryMobileCard } from './InventoryMobileCard';
import { Pagination } from '@/components/ui/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { useTranslations } from 'next-intl';

interface InventoryListProps {
    products: Product[];
}

export const InventoryList = ({ products }: InventoryListProps) => {
    const t = useTranslations('AdminDashboard.inventory');

    const {
        paginatedItems: paginatedProducts,
        currentPage,
        totalPages,
        totalItems,
        handlePageChange
    } = usePagination(products, 10);

    if (products.length === 0) {
        return (
            <Card className="p-8 text-center text-gray-700 font-bold">
                {t('noProducts')}
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {/* Mobile View */}
            <div className="md:hidden space-y-4">
                {paginatedProducts.map((product) => (
                    <InventoryMobileCard key={product._id} product={product} />
                ))}
            </div>

            {/* Desktop View */}
            <Card className="hidden md:block overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('table.product')}</TableHead>
                            <TableHead>{t('table.category')}</TableHead>
                            <TableHead>{t('table.stock')}</TableHead>
                            <TableHead>{t('table.salePrice')}</TableHead>
                            <TableHead>{t('table.status')}</TableHead>
                            <TableHead className="text-right">{t('table.actions')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedProducts.map((product) => {
                            const isLowStock = product.quantity <= product.minStock;
                            const isExpiring = product.expiryDate && new Date(product.expiryDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

                            return (
                                <TableRow key={product._id}>
                                    <TableCell>
                                        <div className="text-sm font-bold text-gray-900">{product.name}</div>
                                        {product.expiryDate && (
                                            <div className="text-xs text-gray-700 font-bold">
                                                {t('table.expires', { date: new Date(product.expiryDate).toLocaleDateString() })}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-700 font-bold">
                                        {product.category}
                                    </TableCell>
                                    <TableCell>
                                        <div className={`text-sm font-bold ${isLowStock ? "text-red-600" : "text-gray-900"} `}>
                                            {product.quantity}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-700 font-bold">
                                        ${product.salePrice.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
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
                                    </TableCell>
                                    <TableCell className="text-right font-bold">
                                        <Link
                                            href={`/administrador/inventario/${product._id}`}
                                            className="text-sm font-medium text-teal-600 hover:text-teal-900"
                                        >
                                            {t('manage')}
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
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
