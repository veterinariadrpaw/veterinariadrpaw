import { Appointment } from "./types";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

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
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Fecha/Hora</TableHead>
                        <TableHead>Paciente</TableHead>
                        <TableHead>Motivo</TableHead>
                        <TableHead>Detalle</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appointments.map((app) => {
                        const fecha = new Date(app.date);
                        const fechaTexto = fecha.toLocaleDateString();
                        const horaTexto = fecha.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

                        return (
                            <TableRow key={app._id}>
                                {/* FECHA ARRIBA - HORA ABAJO */}
                                <TableCell className="whitespace-nowrap text-sm text-gray-900">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{fechaTexto}</span>
                                        <span className="text-gray-500">{horaTexto}</span>
                                    </div>
                                </TableCell>

                                {/* PACIENTE */}
                                <TableCell className="whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {app.pet?.nombre}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {app.pet?.propietario?.name}
                                    </div>
                                </TableCell>

                                {/* MOTIVO */}
                                <TableCell className="text-sm text-gray-500">
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
                                        className="text-indigo-600 hover:text-indigo-900 text-xs underline mt-1"
                                    >
                                        Ver completo
                                    </button>
                                </TableCell>

                                {/* COLUMNA DETALLE (VETERINARIO + ESTADO + ACCIONES) */}
                                <TableCell className="text-sm text-gray-700">
                                    <div className="flex flex-col">

                                        {/* Veterinario */}
                                        <span className="font-medium text-gray-900 mb-1">
                                            {app.veterinarian?.name || "Sin asignar"}
                                        </span>

                                        {/* Estado */}
                                        <div className="mb-2">
                                            <Badge
                                                variant={
                                                    app.status === "aceptada" ? "success" :
                                                        app.status === "cancelada" ? "danger" : "warning"
                                                }
                                            >
                                                {app.status}
                                            </Badge>
                                        </div>

                                        {/* Acciones */}
                                        <div className="flex flex-col gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onUpdateStatus(app._id, "aceptada")}
                                                className="text-green-600 hover:text-green-900 justify-start px-0 h-auto py-0.5"
                                            >
                                                Aceptar
                                            </Button>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onUpdateStatus(app._id, "cancelada")}
                                                className="text-red-600 hover:text-red-900 justify-start px-0 h-auto py-0.5"
                                            >
                                                Cancelar
                                            </Button>

                                            <div className="mt-1">
                                                <WhatsAppButton appointment={app} />
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
