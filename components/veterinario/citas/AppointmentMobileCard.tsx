import { Appointment } from "./types";
import WhatsAppButton from "@/components/WhatsAppButton";

interface AppointmentMobileCardProps {
    appointment: Appointment;
    onUpdateStatus: (id: string, status: string) => void;
    onViewReason: (reason: string, pet: string, date: string) => void;
}

export default function AppointmentMobileCard({
    appointment,
    onUpdateStatus,
    onViewReason,
}: AppointmentMobileCardProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow border">
            <p className="text-sm font-semibold text-gray-700">
                {new Date(appointment.date).toLocaleString()}
            </p>

            <p className="mt-2 text-gray-900 font-medium">
                {appointment.pet?.nombre || "Paciente desconocido"}
            </p>

            <p className="text-gray-600 text-sm">
                Propietario: {appointment.pet?.propietario?.name}
            </p>

            <button
                onClick={() =>
                    onViewReason(
                        appointment.reason,
                        appointment.pet?.nombre || "Desconocido",
                        new Date(appointment.date).toLocaleString()
                    )
                }
                className="mt-1 text-indigo-600 hover:text-indigo-900 text-sm underline text-left"
            >
                Ver motivo completo
            </button>

            <p className="mt-1 text-gray-600 text-sm">
                Veterinario: {appointment.veterinarian?.name}
            </p>

            <p className="mt-2">
                <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${appointment.status === "aceptada"
                            ? "bg-green-100 text-green-800"
                            : appointment.status === "cancelada"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                        }`}
                >
                    {appointment.status}
                </span>
            </p>

            <div className="flex gap-3 mt-4">
                <button
                    onClick={() => onUpdateStatus(appointment._id, "aceptada")}
                    className="text-green-600 font-semibold"
                >
                    Aceptar
                </button>

                <button
                    onClick={() => onUpdateStatus(appointment._id, "cancelada")}
                    className="text-red-600 font-semibold"
                >
                    Cancelar
                </button>

                <WhatsAppButton appointment={appointment} />
            </div>
        </div>
    );
}
