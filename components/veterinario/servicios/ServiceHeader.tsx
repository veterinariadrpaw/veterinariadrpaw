import Link from 'next/link';
import React from 'react';

export const ServiceHeader = () => {
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Servicios Veterinarios</h1>
            <Link
                href="/veterinario/servicios/nuevo"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
                Nuevo Servicio
            </Link>
        </div>
    );
};
