import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { name: string; email: string; role: string }) => void;
    initialData?: { name: string; email: string; role: string };
}

export const UserModal = ({ isOpen, onClose, onSave, initialData }: UserModalProps) => {
    const [formData, setFormData] = useState({ name: "", email: "", role: "cliente" });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({ name: "", email: "", role: "cliente" });
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? "Editar Usuario" : "Nuevo Usuario"}
            footer={
                <>
                    <Button variant="outline" onClick={onClose} className="mr-2">
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit}>
                        Guardar
                    </Button>
                </>
            }
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Input
                        label="Nombre"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <Input
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="role" className="mb-1">Rol</Label>
                    <select
                        id="role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="p-3 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="cliente">Cliente</option>
                        <option value="veterinario">Veterinario</option>
                        <option value="administrador">Administrador</option>
                    </select>
                </div>
            </form>
        </Modal>
    );
};
