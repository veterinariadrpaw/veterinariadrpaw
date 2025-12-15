export interface Stats {
    totalPets: number;
    upcomingAppointments: number;
    pendingAppointments: number;
}

export interface Pet {
    _id: string;
    nombre: string;
    especie: string;
    edad?: number;
    fotoUrl?: string;
}

export interface Appointment {
    _id: string;
    date: string;
    reason: string;
    status: string;
    pet: { nombre: string };
    veterinarian?: { name: string };
}
