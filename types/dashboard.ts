export interface ClientDashboardStats {
    totalPets: number;
    upcomingAppointments: number;
    pendingAppointments: number;
}

export interface VetDashboardStats {
    appointmentsToday: number;
    activePatients: number;
    pendingAppointments: number;
}

export interface AdminDashboardStats {
    totalUsers: number;
    vets: number;
    clients: number;
}
