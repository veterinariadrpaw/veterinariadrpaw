"use client";

import dynamic from "next/dynamic";

const CalendarContent = dynamic(() => import("./CalendarContent"), {
    loading: () => <div className="h-96 bg-white rounded-xl shadow-lg flex items-center justify-center">Cargando calendario...</div>,
    ssr: false
});

export default function Calendar() {
    return (
        <div className="flex flex-col bg-teal-900 min-h-screen">
            {/* Calendario de Eventos */}
            <div className="max-w-6xl mx-auto w-full px-4 py-16">
                <h2 className="text-3xl font-bold text-gray-200 mb-6 text-center">
                    Calendario de Vacunación y Desparasitación
                </h2>

                <CalendarContent />
            </div>
        </div>
    );
}
