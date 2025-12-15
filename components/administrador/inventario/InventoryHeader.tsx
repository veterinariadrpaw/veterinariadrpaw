import Link from 'next/link';
import React from 'react';

export const InventoryHeader = () => {
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Inventario General</h1>
            <Link
                href="/administrador/inventario/nuevo"
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors"
            >
                + Nuevo Producto
            </Link>
        </div>
    );
};
