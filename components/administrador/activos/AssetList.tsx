import Link from 'next/link';
import React from 'react';
import { Card } from '@/components/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { AssetMobileCard } from './AssetMobileCard';
import { Pagination } from '@/components/ui/Pagination';
import { usePagination } from '@/hooks/usePagination';

interface Asset {
    _id: string;
    name: string;
    category: string;
    quantity: number;
    unitCost: number;
    totalValue: number;
    acquisitionDate: string;
    isDepreciable: boolean;
}

interface AssetListProps {
    assets: Asset[];
    onDelete: (id: string) => void;
}

export const AssetList = ({ assets, onDelete }: AssetListProps) => {
    const {
        paginatedItems: paginatedAssets,
        currentPage,
        totalPages,
        totalItems,
        handlePageChange
    } = usePagination(assets, 10);

    if (assets.length === 0) {
        return (
            <div className="p-6 text-center text-gray-700 bg-white rounded-lg shadow">
                No hay activos registrados.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Mobile View */}
            <div className="md:hidden space-y-4">
                {paginatedAssets.map((asset) => (
                    <AssetMobileCard
                        key={asset._id}
                        asset={asset}
                        onDelete={onDelete}
                    />
                ))}
            </div>

            {/* Desktop View */}
            <Card className="hidden md:block overflow-hidden overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Categoría</TableHead>
                            <TableHead>Cantidad</TableHead>
                            <TableHead>Costo Unit.</TableHead>
                            <TableHead>Valor Actual</TableHead>
                            <TableHead>Adquisición</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedAssets.map((asset) => (
                            <TableRow key={asset._id} className="hover:bg-gray-50">
                                <TableCell>
                                    <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                                </TableCell>
                                <TableCell>
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                        {asset.category}
                                    </span>
                                </TableCell>
                                <TableCell className="text-sm text-gray-700">
                                    {asset.quantity}
                                </TableCell>
                                <TableCell className="text-sm text-gray-700">
                                    ${asset.unitCost.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-sm font-bold text-gray-900">
                                    ${asset.totalValue.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-sm text-gray-700">
                                    {new Date(asset.acquisitionDate).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right text-sm font-medium">
                                    <Link
                                        href={`/administrador/activos/${asset._id}`}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => onDelete(asset._id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Eliminar
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
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
