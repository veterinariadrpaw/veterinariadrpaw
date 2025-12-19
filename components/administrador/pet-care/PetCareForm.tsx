"use client";

import { useState, useEffect } from "react";
import { PetCareItem } from "@/hooks/usePetCare";

interface PetCareFormProps {
    initialData?: Partial<PetCareItem>;
    onSubmit: (data: Omit<PetCareItem, "_id">) => Promise<void>;
    onCancel: () => void;
    isEditing?: boolean;
}

export default function PetCareForm({ initialData, onSubmit, onCancel, isEditing = false }: PetCareFormProps) {
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        category: "",
        link: "",
        date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                excerpt: initialData.excerpt || "",
                category: initialData.category || "",
                link: initialData.link || "",
                date: initialData.date || "",
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit(formData as any);
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Título</label>
                <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500 text-black"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Categoría</label>
                <input
                    type="text"
                    name="category"
                    required
                    placeholder="Ej: Salud Preventiva, Nutrición"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500 text-black"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Extracto / Descripción corta</label>
                <textarea
                    name="excerpt"
                    required
                    rows={3}
                    value={formData.excerpt}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500 text-black"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Enlace (URL)</label>
                <input
                    type="url"
                    name="link"
                    required
                    value={formData.link}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500 text-black"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Fecha de publicación</label>
                <input
                    type="text"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500 text-black"
                />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50"
                >
                    {loading ? "Guardando..." : isEditing ? "Actualizar Artículo" : "Crear Artículo"}
                </button>
            </div>
        </form>
    );
}
