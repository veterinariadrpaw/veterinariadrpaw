import React from 'react';
import { AdminDashboardStats } from '@/types/dashboard';

export const DashboardStatsCards = ({ stats }: { stats: AdminDashboardStats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                <h3 className="text-gray-500 text-sm font-medium uppercase">Total Usuarios</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-indigo-500">
                <h3 className="text-gray-500 text-sm font-medium uppercase">Veterinarios</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.vets}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                <h3 className="text-gray-500 text-sm font-medium uppercase">Clientes</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.clients}</p>
            </div>
        </div>
    );
};
