import { AppointmentStatus } from "./types";
import { filterByStatus } from "./utils";

interface AppointmentTabsProps {
    activeTab: AppointmentStatus;
    appointments: any[];
    onTabChange: (tab: AppointmentStatus) => void;
}

export default function AppointmentTabs({
    activeTab,
    appointments,
    onTabChange,
}: AppointmentTabsProps) {
    const getCount = (status: string) => {
        return filterByStatus(appointments, status).length;
    };

    return (
        <div className="bg-white rounded-lg shadow mb-4">
            <div className="border-b border-gray-200">
                <nav className="flex">

                    {/* PENDIENTES */}
                    <button
                        onClick={() => onTabChange("pendiente")}
                        className={`flex-1 min-w-0 py-3 px-2 text-xs sm:text-sm font-medium text-center border-b-2 transition-colors whitespace-normal
          ${activeTab === "pendiente"
                                ? "border-yellow-500 text-yellow-600"
                                : "border-transparent text-gray-700 hover:border-gray-300"
                            }`}
                    >
                        {/* Texto largo (tablet/desktop) */}
                        <span className="hidden sm:inline">
                            Pendientes ({getCount("pendiente")})
                        </span>

                        {/* Texto corto (mobile) */}
                        <span className="sm:hidden">
                            P ({getCount("pendiente")})
                        </span>
                    </button>

                    {/* ACEPTADAS */}
                    <button
                        onClick={() => onTabChange("aceptada")}
                        className={`flex-1 min-w-0 py-3 px-2 text-xs sm:text-sm font-medium text-center border-b-2 transition-colors whitespace-normal
          ${activeTab === "aceptada"
                                ? "border-green-500 text-green-600"
                                : "border-transparent text-gray-700 hover:border-gray-300"
                            }`}
                    >
                        <span className="hidden sm:inline">
                            Aceptadas ({getCount("aceptada")})
                        </span>
                        <span className="sm:hidden">
                            A ({getCount("aceptada")})
                        </span>
                    </button>

                    {/* CANCELADAS */}
                    <button
                        onClick={() => onTabChange("cancelada")}
                        className={`flex-1 min-w-0 py-3 px-2 text-xs sm:text-sm font-medium text-center border-b-2 transition-colors whitespace-normal
          ${activeTab === "cancelada"
                                ? "border-red-500 text-red-600"
                                : "border-transparent text-gray-700 hover:border-gray-300"
                            }`}
                    >
                        <span className="hidden sm:inline">
                            Canceladas ({getCount("cancelada")})
                        </span>
                        <span className="sm:hidden">
                            C ({getCount("cancelada")})
                        </span>
                    </button>

                </nav>
            </div>
        </div>

    );
}
