import Image from "next/image";
import React from "react";

export const MissionVision = () => {
    return (
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start mb-24">
            <div>
                <h2 className="text-3xl font-extrabold text-gray-900">
                    Nuestra Misión
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                    Nuestra misión es proporcionar atención médica veterinaria de la más alta calidad,
                    tratando a cada paciente con el mismo amor y respeto que trataríamos a nuestras propias mascotas.
                    Nos esforzamos por educar a nuestros clientes y fomentar el vínculo humano-animal.
                </p>

                <h2 className="mt-10 text-3xl font-extrabold text-gray-900">
                    El Equipo
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                    Contamos con un equipo multidisciplinario de veterinarios especialistas, técnicos y
                    personal de apoyo apasionados por los animales. Cada miembro se capacita constantemente
                    para estar al día con los últimos avances médicos.
                </p>
            </div>

            <div className="mt-10 lg:mt-0">
                <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
                    <Image src="/imagenveterinarionueva.jpeg" alt="Equipo" height={400} width={600} />
                </div>
            </div>
        </div>
    );
};
