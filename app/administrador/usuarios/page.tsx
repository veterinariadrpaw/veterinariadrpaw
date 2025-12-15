"use client";

import { useState, useEffect } from "react";
import { User } from "@/types/user";
import { UserList } from "@/components/administrador/usuarios/UserList";
import { UserModal } from "@/components/administrador/usuarios/UserModal";

export default function AdministradorUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState<User | null>(null);

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

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;

        try {
            const res = await fetch(`/api/users?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setUsers(users.filter(u => u._id !== id));
            } else {
                alert("Error al eliminar usuario");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleEditClick = (user: User) => {
        setEditingUser(user);
    };

    const handleUpdate = async (formData: { name: string; email: string; role: string }) => {
        if (!editingUser) return;

        try {
            const res = await fetch(`/api/users?id=${editingUser._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const updatedUser = await res.json();
                setUsers(users.map(u => u._id === updatedUser._id ? updatedUser : u));
                setEditingUser(null);
            } else {
                alert("Error al actualizar usuario");
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Gestión de Usuarios</h1>
            </div>

            {loading ? (
                <p>Cargando...</p>
            ) : (
                <UserList users={users} onEdit={handleEditClick} onDelete={handleDelete} />
            )}

            {/* Edit Modal */}
            <UserModal
                isOpen={!!editingUser}
                onClose={() => setEditingUser(null)}
                onSave={handleUpdate}
                initialData={editingUser ? { name: editingUser.name, email: editingUser.email, role: editingUser.role } : undefined}
            />
        </div>
    );
}
