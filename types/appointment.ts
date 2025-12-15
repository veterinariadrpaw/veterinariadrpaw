export interface Appointment {
    _id: string;
    date: string;
    reason?: string;
    status: string;
    notas?: string;
    pet: { nombre: string; especie?: string };
    veterinarian?: { name: string };
}
