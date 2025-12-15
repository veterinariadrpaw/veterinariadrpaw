export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt?: string;
}

export interface Profile extends User {
    telefono: string;
    direccion: string;
}
