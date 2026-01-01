import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';

export const QuickActions = () => {
    const t = useTranslations('VetPanel.dashboard.quickActions');

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link href="/veterinario/citas" className="block">
                <Button className="w-full py-8 text-lg bg-indigo-600 hover:bg-indigo-700 text-white">
                    + {t('newAppt')}
                </Button>
            </Link>
            <Link href="/veterinario/mascotas" className="block">
                <Button variant="outline" className="w-full py-8 text-lg border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                    {t('viewPatients')}
                </Button>
            </Link>
        </div>
    );
};
