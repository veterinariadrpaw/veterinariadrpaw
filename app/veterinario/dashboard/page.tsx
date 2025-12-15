"use client";

import { useEffect, useState } from "react";
import { Appointment } from "@/types/appointment";
import { VetDashboardStats } from "@/types/dashboard";
import { DashboardStats } from "@/components/veterinario/dashboard/DashboardStats";
import { QuickActions } from "@/components/veterinario/dashboard/QuickActions";
import { RecentActivity } from "@/components/veterinario/dashboard/RecentActivity";

interface Pet {
    _id: string;
}

export default function VeterinarianDashboard() {
    const [stats, setStats] = useState<VetDashboardStats>({
        appointmentsToday: 0,
        activePatients: 0,
        pendingAppointments: 0
    });
    const [recentActivity, setRecentActivity] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [apptRes, petsRes] = await Promise.all([
                fetch("/api/appointments?my_appointments=true"),
                fetch("/api/pets")
            ]);

            if (apptRes.ok && petsRes.ok) {
                const appointments: Appointment[] = await apptRes.json();
                const pets: Pet[] = await petsRes.json();

                // Calculate Stats
                const today = new Date().toDateString();
                const todayAppts = appointments.filter(a => new Date(a.date).toDateString() === today);
                const pendingAppts = appointments.filter(a => a.status === "pendiente");

                setStats({
                    appointmentsToday: todayAppts.length,
                    activePatients: pets.length,
                    pendingAppointments: pendingAppts.length
                });

                // Recent Activity (Last 5 appointments)
                setRecentActivity(appointments.slice(0, 5));
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-6">Cargando dashboard...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Resumen de la Clínica</h1>

            {/* Stats Cards */}
            <DashboardStats stats={stats} />

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                <QuickActions />
                <RecentActivity appointments={recentActivity} />
            </div>
        </div>
    );
}
