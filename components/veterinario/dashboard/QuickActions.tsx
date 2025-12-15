import Link from 'next/link';
import React from 'react';

export const QuickActions = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link href="/veterinario/citas" className="bg-indigo-600 text-white p-4 rounded-lg shadow hover:bg-indigo-700 text-center font-bold transition-colors">
                + Nueva Cita
            </Link>
            <Link href="/veterinario/mascotas" className="bg-white text-indigo-600 border border-indigo-600 p-4 rounded-lg shadow hover:bg-indigo-50 text-center font-bold transition-colors">
                Ver Pacientes
            </Link>
        </div>
    );
};
