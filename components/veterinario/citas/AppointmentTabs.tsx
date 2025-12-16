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
                <nav className="flex -mb-px">
                    <button
                        onClick={() => onTabChange("pendiente")}
                        className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${activeTab === "pendiente"
                            ? "border-yellow-500 text-yellow-600"
                            : "border-transparent text-gray-700 hover:text-gray-700 hover:border-gray-300"
                            }`}
                    >
                        Pendientes ({getCount("pendiente")})
                    </button>
                    <button
                        onClick={() => onTabChange("aceptada")}
                        className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${activeTab === "aceptada"
                            ? "border-green-500 text-green-600"
                            : "border-transparent text-gray-700 hover:text-gray-700 hover:border-gray-300"
                            }`}
                    >
                        Aceptadas ({getCount("aceptada")})
                    </button>
                    <button
                        onClick={() => onTabChange("cancelada")}
                        className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${activeTab === "cancelada"
                            ? "border-red-500 text-red-600"
                            : "border-transparent text-gray-700 hover:text-gray-700 hover:border-gray-300"
                            }`}
                    >
                        Canceladas ({getCount("cancelada")})
                    </button>
                </nav>
            </div>
        </div>
    );
}
