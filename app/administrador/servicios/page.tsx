"use client";

import { useServices } from "@/hooks/useServices";
import { ServiceList } from "@/components/administrador/servicios/ServiceList";
import { ServiceHeader } from "@/components/administrador/servicios/ServiceHeader";
import { ServiceFilters } from "@/components/administrador/servicios/ServiceFilters";

export default function ADMINServicesPage() {
    const {
        services,
        loading,
        showActiveOnly,
        setShowActiveOnly,
        toggleServiceStatus
    } = useServices();

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <ServiceHeader />
            <ServiceFilters showActiveOnly={showActiveOnly} setShowActiveOnly={setShowActiveOnly} />

            {loading ? (
                <p>Cargando servicios...</p>
            ) : (
                <ServiceList services={services} onToggleStatus={toggleServiceStatus} />
            )}
        </div>
    );
}
