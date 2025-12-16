"use client";

import { useState } from "react";
import { User } from "@/types/user";
import { useUsers } from "@/hooks/useUsers";
import { UserList } from "@/components/administrador/usuarios/UserList";
import { UserModal } from "@/components/administrador/usuarios/UserModal";

export default function AdministradorUsersPage() {
    const { users, loading, deleteUser, updateUser } = useUsers();
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const handleEditClick = (user: User) => {
        setEditingUser(user);
    };

    const handleUpdate = async (formData: { name: string; email: string; role: string }) => {
        if (!editingUser) return;
        const success = await updateUser(editingUser._id, formData);
        if (success) {
            setEditingUser(null);
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
                <UserList users={users} onEdit={handleEditClick} onDelete={deleteUser} />
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

