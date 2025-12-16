import Link from 'next/link';
import React from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Card } from '@/components/ui/Card';

interface InventoryListProps {
    products: Product[];
}

export const InventoryList = ({ products }: InventoryListProps) => {
    return (
        <Card className="overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Producto</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Precio Venta</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-500">
                                No se encontraron productos.
                            </TableCell>
                        </TableRow>
                    ) : (
                        products.map((product) => {
                            const isLowStock = product.quantity <= product.minStock;
                            const isExpiring = product.expiryDate && new Date(product.expiryDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

                            return (
                                <TableRow key={product._id}>
                                    <TableCell>
                                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                        {product.expiryDate && (
                                            <div className="text-xs text-gray-500">
                                                Vence: {new Date(product.expiryDate).toLocaleDateString()}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-500">
                                        {product.category}
                                    </TableCell>
                                    <TableCell>
                                        <div className={`text-sm font-bold ${isLowStock ? "text-red-600" : "text-gray-900"} `}>
                                            {product.quantity}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-500">
                                        ${product.salePrice.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
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
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link
                                            href={`/administrador/inventario/${product._id}`}
                                            className="text-sm font-medium text-teal-600 hover:text-teal-900"
                                        >
                                            Gestionar
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </Card>
    );
};
