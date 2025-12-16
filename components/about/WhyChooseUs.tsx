import React from "react";

export const WhyChooseUs = () => {
    return (
        <div className="mb-24 ">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
                ¿Por qué elegirnos?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                <div className="text-center">
                    <div className="text-black-700 text-5xl mb-4">🐾</div>
                    <h3 className="text-xl text-black font-bold">Atención Personalizada</h3>
                    <p className="text-gray-700 mt-2">
                        Cada mascota es tratada como un miembro de nuestra familia.
                    </p>
                </div>

                <div className="text-center">
                    <div className="text-teal-700 text-5xl mb-4">💉</div>
                    <h3 className="text-xl text-black font-bold">Profesionales Capacitados</h3>
                    <p className="text-gray-700 mt-2">
                        Veterinarios formados y actualizados con tecnología moderna.
                    </p>
                </div>

                <div className="text-center">
                    <div className="text-teal-700 text-5xl mb-4">❤️</div>
                    <h3 className="text-xl text-black font-bold">Pasión por los Animales</h3>
                    <p className="text-gray-700 mt-2">
                        Trabajamos por vocación, no solo por profesión.
                    </p>
                </div>
            </div>
        </div>
    );
};
