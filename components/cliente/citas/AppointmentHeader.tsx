import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/Button';

export const AppointmentHeader = () => {
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Mis Citas</h1>
            <Link href="/cliente/citas/nueva">
                <Button className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2">
                    <span className="text-xl">📅</span>
                    Nueva Cita
                </Button>
            </Link>
        </div>
    );
};
