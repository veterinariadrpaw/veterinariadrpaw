import Link from 'next/link';
import React from 'react';

export const AppointmentHeader = () => {
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Mis Citas</h1>
            <Link
                href="/cliente/citas/nueva"
                className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
                <span className="text-xl">📅</span>
                Nueva Cita
            </Link>
        </div>
    );
};
