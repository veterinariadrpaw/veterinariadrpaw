import React from "react";
import { ServiceCard, ServiceSection } from "./ServiceCard";

export const ServiceList = () => {
    const services: ServiceSection[] = [
        {
            category: "🐾 Servicios Veterinarios",
            items: [
                "👨‍⚕️ Consulta general",
                "🚨 Consulta de urgencias (24 horas)",
                "📈 Control crecimiento y peso",
                "🐶👵 Control geriátrico (mascotas mayores)",
                "🩺 Control postoperatorio",
                "💊 Seguimiento de tratamientos",
            ],
        },
        {
            category: "💉 Vacunaciones y Desparasitaciones",
            items: [
                "📅 Planes de vacunaciones",
                "🦠 Desparasitaciones internas",
                "🐜 Desparasitaciones externas",
                "🛡️ Programas preventivos",
                "🐾 Productos antiparasitarios",
            ],
        },
        {
            category: "🔪 Cirugías",
            items: [
                "✂️ Esterilizaciones / Castraciones",
                "🧵 Cirugías tejidos blandos",
                "🦴 Cirugías traumatológicas",
                "👁️ Cirugías oculares",
                "🚑 Cirugías de emergencia",
            ],
        },
        {
            category: "🏥 Hospitalización",
            items: [
                "📡 Monitoreo 24h",
                "🥣 Alimentación y control de fluidos",
            ],
        },
        {
            category: "🎀 Servicios Complementarios",
            items: [
                "🥗 Alimentos clínicos y para mascotas",
                "🛍️ Productos veterinarios",
                "✂️🐕 Cortes de pelo y baños medicados",
                "🐾 Corte de uñas y limpieza de oídos",
                "🧸 Juguetes, accesorios, camas y correas",
                "💆‍♂️ Día de Spa (Baño + Corte + Uñas)",
            ],
        },
        {
            category: "📄 Certificados y Trámites",
            items: [
                "💉 Certificados de vacunaciones",
                "🦠 Certificados de desparasitaciones",
                "🔪 Certificados de cirugías",
                "🏥 Certificados de hospitalizaciones",
                "🐶❤️ Certificados de adopción",
                "✈️ Trámites sanitarios para traslados/exportación",
            ],
        },
    ];

    return (
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((section) => (
                <ServiceCard key={section.category} section={section} />
            ))}
        </div>
    );
};
