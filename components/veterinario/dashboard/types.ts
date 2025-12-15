export interface Appointment {
    _id: string;
    date: string;
    status: string;
    pet: { nombre: string; especie: string };
    veterinarian: { name: string };
}

export interface DashboardStatsProps {
    appointmentsToday: number;
    activePatients: number;
    pendingAppointments: number;
}
