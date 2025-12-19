"use client";

import { useState } from "react";
import { usePetCare, PetCareItem } from "@/hooks/usePetCare";
import { PetCareList } from "@/components/administrador/pet-care/PetCareList";
import PetCareForm from "@/components/administrador/pet-care/PetCareForm";
import { Plus, X } from "lucide-react";

export default function AdminPetCarePage() {
    const { articles, loading, createArticle, updateArticle, deleteArticle } = usePetCare();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<PetCareItem | null>(null);

    const handleCreate = async (data: Omit<PetCareItem, "_id">) => {
        const success = await createArticle(data);
        if (success) {
            setIsFormOpen(false);
        } else {
            alert("Error al crear el artículo");
        }
    };

    const handleUpdate = async (data: Omit<PetCareItem, "_id">) => {
        if (!editingArticle) return;
        const success = await updateArticle(editingArticle._id, data);
        if (success) {
            setEditingArticle(null);
            setIsFormOpen(false);
        } else {
            alert("Error al actualizar el artículo");
        }
    };

    const handleEdit = (article: PetCareItem) => {
        setEditingArticle(article);
        setIsFormOpen(true);
    };

    const handleCancel = () => {
        setEditingArticle(null);
        setIsFormOpen(false);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md min-h-[600px]">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Gestión de Cuidado de Mascotas</h1>
                    <p className="text-gray-500 text-sm mt-1">Administra los artículos y consejos informativos para los clientes.</p>
                </div>
                {!isFormOpen && (
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Nuevo Artículo
                    </button>
                )}
            </div>

            {isFormOpen ? (
                <div className="max-w-2xl mx-auto bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {editingArticle ? "Editar Artículo" : "Registrar Nuevo Artículo"}
                        </h2>
                        <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
                            <X size={24} />
                        </button>
                    </div>
                    <PetCareForm
                        initialData={editingArticle || undefined}
                        onSubmit={editingArticle ? handleUpdate : handleCreate}
                        onCancel={handleCancel}
                        isEditing={!!editingArticle}
                    />
                </div>
            ) : (
                <>
                    {loading ? (
                        <div className="flex justify-center p-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                        </div>
                    ) : (
                        <PetCareList
                            articles={articles}
                            onEdit={handleEdit}
                            onDelete={deleteArticle}
                        />
                    )}
                </>
            )}
        </div>
    );
}
