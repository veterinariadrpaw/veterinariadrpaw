import { Calendar } from "lucide-react";
import { Appointment } from "@/components/veterinario/citas/types";

interface GoogleCalendarButtonProps {
    appointment: Appointment;
}

export default function GoogleCalendarButton({ appointment }: GoogleCalendarButtonProps) {
    const createGoogleCalendarLink = () => {
        const startDate = new Date(appointment.date);
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hora después

        // Formato: YYYYMMDDTHHmmss
        const formatDate = (date: Date) => {
            return date.toISOString().replace(/-|:|\.\d{3}/g, '');
        };

        const params = new URLSearchParams({
            action: 'TEMPLATE',
            text: `Cita Veterinaria - ${appointment.pet?.nombre || 'Mascota'}`,
            dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
            details: `Motivo: ${appointment.reason}\nPaciente: ${appointment.pet?.nombre || 'Desconocido'}\nPropietario: ${appointment.pet?.propietario?.name || 'Desconocido'}`,
            location: 'Clínica Veterinaria',
        });

        return `https://calendar.google.com/calendar/render?${params.toString()}`;
    };

    return (
        <div className="flex items-center gap-2">
            <a
                href={createGoogleCalendarLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-7 px-3 text-xs font-medium
               text-white bg-blue-600 rounded-md
               hover:bg-blue-700 transition-colors"
            >
                <Calendar size={14} />
                <span>Agregar al calendario</span>
            </a>
        </div>


    );
}
