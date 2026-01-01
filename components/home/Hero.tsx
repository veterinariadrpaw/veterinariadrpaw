import Link from "next/link";
import Image from "next/image";
import { useTranslations } from 'next-intl';

export default function Hero() {
    const t = useTranslations('Hero');

    return (
        <div className="relative overflow-hidden isolate">
            <Image
                src="/imagen2.jpg"
                alt="Fondo de mascota"
                fill
                priority
                className="object-cover object-center -z-10"
            />
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-900 to-teal-800 opacity-20" />
            </div>
            <div className="relative max-w-7xl mx-auto py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    {t('title')} <br className="hidden sm:inline" />
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-teal-50 max-w-3xl leading-relaxed">
                    {t('description')}
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/contacto"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-teal-900 bg-teal-50 hover:bg-teal-100 transition-smooth shadow-md hover:shadow-lg"
                    >
                        {t('contact')}
                    </Link>
                    <Link
                        href="/sobre"
                        className="inline-flex items-center justify-center px-6 py-3 border-2 border-teal-100 text-base font-medium rounded-lg text-white bg-teal-700/50 hover:bg-teal-700 backdrop-blur-sm transition-smooth"
                    >
                        {t('about')}
                    </Link>
                </div>
            </div>
        </div>
    );
}

