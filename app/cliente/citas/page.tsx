"use client";

import { useState, useEffect } from "react";
import { Appointment } from "@/types/appointment";
import { AppointmentList } from "@/components/cliente/citas/AppointmentList";
import { AppointmentHeader } from "@/components/cliente/citas/AppointmentHeader";

export default function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/appointments?my_appointments=true");
      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm("¿Estás seguro de cancelar esta cita?")) return;

    try {
      const res = await fetch(`/api/appointments?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelada" }),
      });

      if (res.ok) {
        fetchAppointments();
      } else {
        alert("Error al cancelar la cita");
      }
    } catch (error) {
      console.error("Error canceling appointment:", error);
      alert("Error al cancelar la cita");
    }
  };

  return (
    <div>
      <AppointmentHeader />

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <AppointmentList appointments={appointments} onCancel={handleCancel} />
      )}
    </div>
  );
}
