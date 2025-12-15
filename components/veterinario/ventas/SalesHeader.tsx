import Link from 'next/link';
import React from 'react';

export const SalesHeader = () => {
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Historial de Ventas</h1>
            <Link
                href="/veterinario/ventas/nueva"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
                + Nueva Venta
            </Link>
        </div>
    );
};
