"use client";

import { useState, useEffect } from "react";
import { RoleList } from "@/components/administrador/roles/RoleList";

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

export default function administradorRolesPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/users");
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const [modifiedRoles, setModifiedRoles] = useState<{ [key: string]: string }>({});

    const handleRoleChange = (userId: string, newRole: string) => {
        setModifiedRoles(prev => ({ ...prev, [userId]: newRole }));
    };

    const saveRole = async (userId: string) => {
        const newRole = modifiedRoles[userId];
        if (!newRole) return;

        try {
            const res = await fetch(`/api/users?id=${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: newRole }),
            });
            if (res.ok) {
                const updatedUser = await res.json();
                // Update local users state to reflect change and clear modified state
                setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
                setModifiedRoles(prev => {
                    const next = { ...prev };
                    delete next[userId];
                    return next;
                });
                alert("Rol actualizado correctamente");
            } else {
                alert("Error al actualizar el rol");
            }
        } catch (error) {
            console.error("Error changing role:", error);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Roles</h1>
            <p className="mb-6 text-gray-600">Asigna roles de Veterinario o Cliente a los usuarios registrados.</p>

            {loading ? (
                <p>Cargando...</p>
            ) : (
                <RoleList
                    users={users}
                    modifiedRoles={modifiedRoles}
                    onRoleChange={handleRoleChange}
                    onSave={saveRole}
                />
            )}
        </div>
    );
}
