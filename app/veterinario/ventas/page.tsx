"use client";

import { useState, useEffect } from "react";
import { ISale, SalesList } from "@/components/veterinario/ventas/SalesList";
import { SalesHeader } from "@/components/veterinario/ventas/SalesHeader";

export default function SalesPage() {
    const [sales, setSales] = useState<ISale[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = async () => {
        try {
            const res = await fetch("/api/sales");
            if (res.ok) {
                const data = await res.json();
                setSales(data);
            }
        } catch (error) {
            console.error("Error fetching sales:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <SalesHeader />

            {loading ? (
                <p>Cargando ventas...</p>
            ) : (
                <SalesList sales={sales} />
            )}
        </div>
    );
}
