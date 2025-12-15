export interface Pet {
    _id: string;
    nombre: string;
    especie: string;
    raza?: string;
    edad?: number;
    peso?: number;
    sexo?: string;
    fechaNacimiento?: string;
    color?: string;
    alergias?: string[];
    esterilizado?: boolean;
    microchip?: string;
    notasEspeciales?: string;
    fotoUrl?: string;
    propietario?: { name: string; email: string };
}
