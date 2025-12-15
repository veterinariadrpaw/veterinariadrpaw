import Link from 'next/link';
import React from 'react';
import { VetDashboardStats } from '@/types/dashboard';

export const DashboardStats = ({ stats }: { stats: VetDashboardStats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
                <h3 className="text-gray-500 text-sm font-medium uppercase">Citas Hoy</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.appointmentsToday}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-gray-500 text-sm font-medium uppercase">Pacientes Totales</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activePatients}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                <h3 className="text-gray-500 text-sm font-medium uppercase">Citas Pendientes</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pendingAppointments}</p>
            </div>
        </div>
    );
};
