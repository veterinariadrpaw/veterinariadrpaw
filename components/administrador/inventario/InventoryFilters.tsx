import React from 'react';
import { useTranslations } from 'next-intl';

interface InventoryFiltersProps {
    filter: string;
    setFilter: (filter: string) => void;
    search: string;
    setSearch: (search: string) => void;
}

export const InventoryFilters = ({ filter, setFilter, search, setSearch }: InventoryFiltersProps) => {
    const t = useTranslations('AdminDashboard.inventory.filters');

    return (
        <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
                <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded-full text-sm font-bold ${filter === "all" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                >
                    {t('all')}
                </button>
                <button
                    onClick={() => setFilter("lowStock")}
                    className={`px-4 py-2 rounded-full text-sm font-bold ${filter === "lowStock" ? "bg-red-100 text-red-700 ring-1 ring-red-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                >
                    {t('lowStock')}
                </button>
                <button
                    onClick={() => setFilter("expiring")}
                    className={`px-4 py-2 rounded-full text-sm font-bold ${filter === "expiring" ? "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                >
                    {t('expiring')}
                </button>
            </div>
            <div className="relative w-full md:w-64">
                <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full text-black pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
                />
            </div>
        </div>
    );
};
