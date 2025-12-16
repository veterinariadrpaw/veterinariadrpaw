"use client";

import { useInventory } from "@/hooks/useInventory";
import { InventoryHeader } from "@/components/administrador/inventario/InventoryHeader";
import { InventoryFilters } from "@/components/administrador/inventario/InventoryFilters";
import { InventoryList } from "@/components/administrador/inventario/InventoryList";

export default function InventoryPage() {
    const {
        products,
        search,
        setSearch,
        filter,
        setFilter,
    } = useInventory();

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
            />
        </div>
    );
}
