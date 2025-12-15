import { Appointment } from "./types";
import WhatsAppButton from "@/components/WhatsAppButton";

interface AppointmentTableProps {
    appointments: Appointment[];
    onUpdateStatus: (id: string, status: string) => void;
    onViewReason: (reason: string, pet: string, date: string) => void;
}

const truncateText = (text: string, maxLength = 30) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export default function AppointmentTable({
    appointments,
    onUpdateStatus,
    onViewReason,
}: AppointmentTableProps) {
    return (
        <div className="hidden md:block bg-white shadow sm:rounded-lg">
            <table className="w-full table-fixed border-collapse">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha/Hora
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Paciente
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Motivo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Detalle
                        </th>
                    </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                    {appointments.map((app) => {
                        const fecha = new Date(app.date);
                        const fechaTexto = fecha.toLocaleDateString();
                        const horaTexto = fecha.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

                        return (
                            <tr key={app._id}>

                                {/* FECHA ARRIBA - HORA ABAJO */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{fechaTexto}</span>
                                        <span className="text-gray-500">{horaTexto}</span>
                                    </div>
                                </td>

                                {/* PACIENTE */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {app.pet?.nombre}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {app.pet?.propietario?.name}
                                    </div>
                                </td>

                                {/* MOTIVO */}
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    <div className="max-w-[220px]">
                                        {truncateText(app.reason, 30)}
                                    </div>

                                    <button
                                        onClick={() =>
                                            onViewReason(
                                                app.reason,
                                                app.pet?.nombre || "Desconocido",
                                                fecha.toLocaleString()
                                            )
                                        }
                                        className="text-indigo-600 hover:text-indigo-900 text-xs underline"
                                    >
                                        Ver completo
                                    </button>
                                </td>

                                {/* COLUMNA DETALLE (VETERINARIO + ESTADO + ACCIONES) */}
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    <div className="flex flex-col">

                                        {/* Veterinario */}
                                        <span className="font-medium text-gray-900 mb-1">
                                            {app.veterinarian?.name || "Sin asignar"}
                                        </span>

                                        {/* Estado */}
                                        <span
                                            className={`px-2 py-0.5 w-fit text-xs leading-5 font-semibold rounded-full mb-2 ${app.status === "aceptada"
                                                    ? "bg-green-100 text-green-800"
                                                    : app.status === "cancelada"
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                }`}
                                        >
                                            {app.status}
                                        </span>

                                        {/* Acciones UNA POR LÍNEA */}
                                        <button
                                            onClick={() =>
                                                onUpdateStatus(app._id, "aceptada")
                                            }
                                            className="text-green-600 hover:text-green-900 text-sm mb-1"
                                        >
                                            Aceptar
                                        </button>

                                        <button
                                            onClick={() =>
                                                onUpdateStatus(app._id, "cancelada")
                                            }
                                            className="text-red-600 hover:text-red-900 text-sm mb-1"
                                        >
                                            Cancelar
                                        </button>

                                        <div className="mt-1">
                                            <WhatsAppButton appointment={app} />
                                        </div>
                                    </div>
                                </td>

                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
