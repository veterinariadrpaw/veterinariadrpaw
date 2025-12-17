import { Appointment } from "./types";
import WhatsAppButton from "@/components/WhatsAppButton";
import GoogleCalendarButton from "@/components/GoogleCalendarButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

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

    // ✅ EL STATE VA AQUÍ
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const [expandedReasonId, setExpandedReasonId] = useState<string | null>(null);

    const [selectedPet, setSelectedPet] = useState<any | null>(null);


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
                                {/* FECHA */}
                                <TableCell className="whitespace-nowrap text-sm text-gray-900">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{fechaTexto}</span>
                                        <span className="text-gray-700">{horaTexto}</span>
                                    </div>
                                </TableCell>

                                {/* PACIENTE (CLICK PARA VER MÁS) */}
                                <TableCell className="whitespace-nowrap">
                                    <div
                                        className="text-sm font-medium text-gray-900 cursor-pointer hover:underline inline-block"
                                        onClick={() =>
                                            setExpandedId(expandedId === app._id ? null : app._id)
                                        }
                                    >
                                        {app.pet?.nombre}
                                    </div>

                                    <div className="text-sm text-gray-700">
                                        {app.pet?.propietario?.name}
                                    </div>

                                    {expandedId === app._id && (
                                        <div className="text-xs text-black">
                                            <div className="capitalize">
                                                {app.pet?.especie}
                                                {app.pet?.raza && ` · ${app.pet.raza}`}
                                            </div>

                                            <div>
                                                Edad: {app.pet?.edad ? `${app.pet.edad} años` : "N/D"}
                                            </div>
                                        </div>
                                    )}
                                </TableCell>

                                {/* MOTIVO */}

                                <TableCell className="text-sm text-gray-700">
                                    <div className="max-w-[220px]">
                                        {truncateText(app.reason, 30)}
                                    </div>

                                    <button
                                        onClick={() =>
                                            setExpandedReasonId(
                                                expandedReasonId === app._id ? null : app._id
                                            )
                                        }
                                        className="text-gray-900 hover:text-indigo-900 text-xs underline mt-1"
                                    >
                                        Ver completo
                                    </button>

                                    {expandedReasonId === app._id && (
                                        <div className="mt-1 text-xs text-gray-700 max-w-[220px]">
                                            {app.reason}
                                        </div>
                                    )}
                                </TableCell>


                                {/* DETALLE */}
                                <TableCell className="text-sm text-gray-700">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-900 mb-1">
                                            {app.veterinarian?.name || "Sin asignar"}
                                        </span>

                                        <div className="mb-2">
                                            <Badge
                                                variant={
                                                    app.status === "aceptada"
                                                        ? "success"
                                                        : app.status === "cancelada"
                                                            ? "danger"
                                                            : "warning"
                                                }
                                            >
                                                {app.status}
                                            </Badge>
                                        </div>

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

                                            <div className="mt-1 flex flex-col gap-1">
                                                <WhatsAppButton appointment={app} />
                                                <GoogleCalendarButton appointment={app} />
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
