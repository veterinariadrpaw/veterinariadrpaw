"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { InventoryHeader } from "@/components/administrador/inventario/InventoryHeader";
import { InventoryFilters } from "@/components/administrador/inventario/InventoryFilters";
import { InventoryList } from "@/components/administrador/inventario/InventoryList";

export default function InventoryPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all"); // all, lowStock, expiring

    useEffect(() => {
        fetchProducts();
    }, [filter, search]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            let url = `/api/inventory?search=${search}`;
            if (filter === "lowStock") url += "&lowStock=true";
            if (filter === "expiring") url += "&expiring=true";

            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <InventoryHeader />
            <InventoryFilters
                filter={filter}
                setFilter={setFilter}
                search={search}
                setSearch={setSearch}
            />
            <InventoryList
                products={products}
                loading={loading}
            />
        </div>
    );
}
