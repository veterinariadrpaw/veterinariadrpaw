import React from 'react';
import { AdminDashboardStats } from '@/types/dashboard';

export const DashboardStatsCards = ({ stats }: { stats: AdminDashboardStats }) => {
    const statCards = [
        {
            label: 'Total Usuarios',
            value: stats.totalUsers,
            color: 'teal'
        },
        {
            label: 'Veterinarios',
            value: stats.vets,
            color: 'cyan'
        },
        {
            label: 'Clientes',
            value: stats.clients,
            color: 'emerald'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {statCards.map((stat, index) => (
                <div
                    key={stat.label}
                    className={`bg-white p-6 rounded-xl shadow-md border-t-4 transition-smooth hover:shadow-lg ${stat.color === 'teal' ? 'border-teal-500' :
                            stat.color === 'cyan' ? 'border-cyan-500' :
                                'border-emerald-500'
                        }`}
                >
                    <h3 className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                        {stat.label}
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                        {stat.value}
                    </p>
                </div>
            ))}
        </div>
    );
};

