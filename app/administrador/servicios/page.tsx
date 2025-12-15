"use client";

import { useState, useEffect } from "react";
import { Service } from "@/types/service";
import { ServiceList } from "@/components/administrador/servicios/ServiceList";
import { ServiceHeader } from "@/components/administrador/servicios/ServiceHeader";
import { ServiceFilters } from "@/components/administrador/servicios/ServiceFilters";

export default function ADMINServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [showActiveOnly, setShowActiveOnly] = useState(false);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const query = showActiveOnly ? "?activeOnly=true" : "";
            const res = await fetch(`/api/services${query}`);
            if (res.ok) {
                const data = await res.json();
                setServices(data);
            }
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, [showActiveOnly]);

    const handleToggleStatus = async (id: string) => {
        if (!confirm("¿Estás seguro de cambiar el estado de este servicio?")) return;

        try {
            const res = await fetch(`/api/services/${id}`, {
                method: "PATCH",
            });
            if (res.ok) {
                fetchServices();
            } else {
                alert("Error al cambiar el estado");
            }
        } catch (error) {
            console.error("Error toggling status:", error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <ServiceHeader />
            <ServiceFilters showActiveOnly={showActiveOnly} setShowActiveOnly={setShowActiveOnly} />

            {loading ? (
                <p>Cargando servicios...</p>
            ) : (
                <ServiceList services={services} onToggleStatus={handleToggleStatus} />
            )}
        </div>
    );
}
