"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

export default function LocaleSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const onSelectChange = (nextLocale: string) => {
        startTransition(() => {
            // Set the NEXT_LOCALE cookie
            document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;

            // Refresh the page to apply the new locale
            router.refresh();
        });
    };

    return (
        <div className="flex gap-2">
            <button
                onClick={() => onSelectChange('es')}
                className={`text-sm font-medium px-2 py-1 rounded transition-colors ${locale === 'es'
                        ? 'bg-teal-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                disabled={isPending}
            >
                ES
            </button>
            <button
                onClick={() => onSelectChange('en')}
                className={`text-sm font-medium px-2 py-1 rounded transition-colors ${locale === 'en'
                        ? 'bg-teal-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                disabled={isPending}
            >
                EN
            </button>
        </div>
    );
}
