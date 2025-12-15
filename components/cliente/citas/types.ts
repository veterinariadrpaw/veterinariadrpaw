export interface Appointment {
    _id: string;
    date: string;
    reason: string;
    status: string;
    notas?: string;
    veterinarian?: { name: string };
    pet: { nombre: string };
}
