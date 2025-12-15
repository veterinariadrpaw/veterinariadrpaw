import Link from 'next/link';
import React from 'react';

export const ServiceHeader = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-gray-800">Servicios Veterinarios</h1>
            <Link
                href="/administrador/servicios/nuevo"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full md:w-auto text-center"
            >
                Nuevo Servicio
            </Link>
        </div>
    );
};
