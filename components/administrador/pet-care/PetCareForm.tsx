"use client";

import { useState, useEffect } from "react";
import { PetCareItem } from "@/hooks/usePetCare";
import { useTranslations } from "next-intl";

interface PetCareFormProps {
    initialData?: Partial<PetCareItem>;
    onSubmit: (data: Omit<PetCareItem, "_id">) => Promise<void>;
    onCancel: () => void;
    isEditing?: boolean;
}

export default function PetCareForm({ initialData, onSubmit, onCancel, isEditing = false }: PetCareFormProps) {
    const t = useTranslations('AdminDashboard.petCare.form');
    const tc = useTranslations('ClientPanel.common');

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
                <label className="block text-sm font-bold text-gray-700">{t('titleLabel')}</label>
                <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500 text-black font-bold"
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700">{t('categoryLabel')}</label>
                <input
                    type="text"
                    name="category"
                    required
                    placeholder={t('categoryPlaceholder')}
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500 text-black font-bold"
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700">{t('excerptLabel')}</label>
                <textarea
                    name="excerpt"
                    required
                    rows={3}
                    value={formData.excerpt}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500 text-black font-bold"
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700">{t('linkLabel')}</label>
                <input
                    type="url"
                    name="link"
                    required
                    value={formData.link}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500 text-black font-bold"
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700">{t('dateLabel')}</label>
                <input
                    type="text"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500 text-black font-bold"
                />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors font-bold"
                >
                    {tc('cancelar')}
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50 font-bold"
                >
                    {loading ? tc('guardando') : isEditing ? t('updateArticle') : t('createArticle')}
                </button>
            </div>
        </form>
    );
}
