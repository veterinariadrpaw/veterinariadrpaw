"use client";

import { useState } from "react";
import { useCalendarEvents, CalendarEventItem } from "@/hooks/useCalendarEvents";
import { CalendarEventList } from "@/components/administrador/calendar/CalendarEventList";
import CalendarEventForm from "@/components/administrador/calendar/CalendarEventForm";
import { Plus, X } from "lucide-react";

export default function AdminCalendarPage() {
    const { events, loading, createEvent, updateEvent, deleteEvent } = useCalendarEvents();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<CalendarEventItem | null>(null);

    const handleCreate = async (data: Omit<CalendarEventItem, "_id">) => {
        const success = await createEvent(data);
        if (success) {
            setIsFormOpen(false);
        } else {
            alert("Error al crear el evento");
        }
    };

    const handleUpdate = async (data: Omit<CalendarEventItem, "_id">) => {
        if (!editingEvent) return;
        const success = await updateEvent(editingEvent._id, data);
        if (success) {
            setEditingEvent(null);
            setIsFormOpen(false);
        } else {
            alert("Error al actualizar el evento");
        }
    };

    const handleEdit = (event: CalendarEventItem) => {
        setEditingEvent(event);
        setIsFormOpen(true);
    };

    const handleCancel = () => {
        setEditingEvent(null);
        setIsFormOpen(false);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md min-h-[600px]">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Gestión del Calendario</h1>
                    <p className="text-gray-500 text-sm mt-1">Administra los eventos y campañas que se muestran en la página de inicio.</p>
                </div>
                {!isFormOpen && (
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Nuevo Evento
                    </button>
                )}
            </div>

            {isFormOpen ? (
                <div className="max-w-2xl mx-auto bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {editingEvent ? "Editar Evento" : "Registrar Nuevo Evento"}
                        </h2>
                        <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
                            <X size={24} />
                        </button>
                    </div>
                    <CalendarEventForm
                        initialData={editingEvent || undefined}
                        onSubmit={editingEvent ? handleUpdate : handleCreate}
                        onCancel={handleCancel}
                        isEditing={!!editingEvent}
                    />
                </div>
            ) : (
                <>
                    {loading ? (
                        <div className="flex justify-center p-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                        </div>
                    ) : (
                        <CalendarEventList
                            events={events}
                            onEdit={handleEdit}
                            onDelete={deleteEvent}
                        />
                    )}
                </>
            )}
        </div>
    );
}
