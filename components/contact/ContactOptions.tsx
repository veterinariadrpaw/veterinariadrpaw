import React from "react";

export const ContactOptions = () => {
    return (
        <div className="p-6 sm:p-10">
            <h3 className="text-lg font-medium text-gray-900">Envíanos un mensaje</h3>

            {/* WHATSAPP OPTIONS */}
            <div className="mt-6 space-y-8">

                {/* CONSULTA GENERAL */}
                <div>
                    <p className="font-semibold text-gray-800 mb-2">Consulta general</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href="https://wa.me/593995398645?text=Hola%20DrPaw%2C%20tengo%20una%20consulta%20sobre%20mi%20mascota."
                            target="_blank"
                            className="w-full sm:w-auto text-center py-2 px-4 rounded-md bg-green-600 text-white font-medium hover:bg-green-700"
                        >
                            WhatsApp (Móvil)
                        </a>
                        <a
                            href="https://web.whatsapp.com/send?phone=593995398645&text=Hola%20DrPaw%2C%20tengo%20una%20consulta%20sobre%20mi%20mascota."
                            target="_blank"
                            className="w-full sm:w-auto text-center py-2 px-4 rounded-md bg-emerald-600 text-white font-medium hover:bg-emerald-700"
                        >
                            WhatsApp Web (PC)
                        </a>
                    </div>
                </div>

                {/* CITA */}
                <div>
                    <p className="font-semibold text-gray-800 mb-2">Pedir cita</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href="https://wa.me/593995398645?text=Hola%20DrPaw%2C%20quisiera%20agendar%20una%20cita%20para%20mi%20mascota."
                            target="_blank"
                            className="w-full sm:w-auto text-center py-2 px-4 rounded-md bg-green-600 text-white font-medium hover:bg-green-700"
                        >
                            WhatsApp (Móvil)
                        </a>
                        <a
                            href="https://web.whatsapp.com/send?phone=593995398645&text=Hola%20DrPaw%2C%20quisiera%20agendar%20una%20cita%20para%20mi%20mascota."
                            target="_blank"
                            className="w-full sm:w-auto text-center py-2 px-4 rounded-md bg-emerald-600 text-white font-medium hover:bg-emerald-700"
                        >
                            WhatsApp Web (PC)
                        </a>
                    </div>
                </div>

                {/* EMERGENCIA */}
                <div>
                    <p className="font-semibold text-red-700 mb-2">⚠ Emergencia</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href="https://wa.me/593995398645?text=Hola%20DrPaw%2C%20tengo%20una%20emergencia%20con%20mi%20mascota%2C%20por%20favor%20ayuda."
                            target="_blank"
                            className="w-full sm:w-auto text-center py-2 px-4 rounded-md bg-red-600 text-white font-medium hover:bg-red-700"
                        >
                            WhatsApp (Móvil)
                        </a>
                        <a
                            href="https://web.whatsapp.com/send?phone=593995398645&text=Hola%20DrPaw%2C%20tengo%20una%20emergencia%20con%20mi%20mascota%2C%20por%20favor%20ayuda."
                            target="_blank"
                            className="w-full sm:w-auto text-center py-2 px-4 rounded-md bg-red-700 text-white font-medium hover:bg-red-800"
                        >
                            WhatsApp Web (PC)
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
