import React, { useState, useEffect } from 'react';
import { Pet } from '@/types/pet';

interface PetFormProps {
    initialData?: Pet | null;
    onSubmit: (data: any) => Promise<void>;
    onCancel: () => void;
    isEditing: boolean;
}

export const PetForm = ({ initialData, onSubmit, onCancel, isEditing }: PetFormProps) => {
    const [formData, setFormData] = useState({
        nombre: "",
        especie: "Perro",
        raza: "",
        edad: 0,
        peso: 0,
        sexo: "",
        fechaNacimiento: "",
        color: "",
        alergias: [] as string[],
        esterilizado: false,
        microchip: "",
        notasEspeciales: "",
    });
    const [alergiaInput, setAlergiaInput] = useState("");

    useEffect(() => {
        if (initialData) {
            setFormData({
                nombre: initialData.nombre,
                especie: initialData.especie,
                raza: initialData.raza,
                edad: initialData.edad || 0,
                peso: initialData.peso || 0,
                sexo: initialData.sexo || "",
                fechaNacimiento: initialData.fechaNacimiento || "",
                color: initialData.color || "",
                alergias: initialData.alergias || [],
                esterilizado: initialData.esterilizado || false,
                microchip: initialData.microchip || "",
                notasEspeciales: initialData.notasEspeciales || "",
            });
        }
    }, [initialData]);

    const addAlergia = () => {
        if (alergiaInput.trim()) {
            setFormData({ ...formData, alergias: [...formData.alergias, alergiaInput.trim()] });
            setAlergiaInput("");
        }
    };

    const removeAlergia = (index: number) => {
        setFormData({ ...formData, alergias: formData.alergias.filter((_, i) => i !== index) });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">{isEditing ? "Editar Mascota" : "Registrar Mascota"}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Información Básica */}
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Información Básica</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre *</label>
                            <input
                                type="text"
                                required
                                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2"
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Especie *</label>
                            <select
                                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2"
                                value={formData.especie}
                                onChange={(e) => setFormData({ ...formData, especie: e.target.value })}
                            >
                                <option value="Perro">Perro</option>
                                <option value="Gato">Gato</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Raza *</label>
                            <input
                                type="text"
                                required
                                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2"
                                value={formData.raza}
                                onChange={(e) => setFormData({ ...formData, raza: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Sexo</label>
                            <select
                                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2"
                                value={formData.sexo}
                                onChange={(e) => setFormData({ ...formData, sexo: e.target.value })}
                            >
                                <option value="">Seleccionar</option>
                                <option value="macho">Macho</option>
                                <option value="hembra">Hembra</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Detalles Físicos */}
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Detalles Físicos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                            <input
                                type="date"
                                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2"
                                value={formData.fechaNacimiento}
                                onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Peso (kg)</label>
                            <input
                                type="number"
                                min="0"
                                step="0.1"
                                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2"
                                value={formData.peso || ""}
                                onChange={(e) => setFormData({ ...formData, peso: parseFloat(e.target.value) || 0 })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Color/Marcas</label>
                            <input
                                type="text"
                                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2"
                                value={formData.color}
                                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                placeholder="Ej: Negro con manchas blancas"
                            />
                        </div>
                    </div>
                </div>

                {/* Información Médica */}
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Información Médica</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Alergias Conocidas</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    className="flex-1 text-black border border-gray-300 rounded-md shadow-sm p-2"
                                    value={alergiaInput}
                                    onChange={(e) => setAlergiaInput(e.target.value)}
                                    placeholder="Ej: Polen, Pollo"
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAlergia())}
                                />
                                <button
                                    type="button"
                                    onClick={addAlergia}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Agregar
                                </button>
                            </div>
                            {formData.alergias.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {formData.alergias.map((alergia, index) => (
                                        <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                            {alergia}
                                            <button
                                                type="button"
                                                onClick={() => removeAlergia(index)}
                                                className="hover:text-red-900"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="esterilizado"
                                checked={formData.esterilizado}
                                onChange={(e) => setFormData({ ...formData, esterilizado: e.target.checked })}
                                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                            />
                            <label htmlFor="esterilizado" className="ml-2 block text-sm text-gray-900">
                                Esterilizado/Castrado
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Número de Microchip</label>
                            <input
                                type="text"
                                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2"
                                value={formData.microchip}
                                onChange={(e) => setFormData({ ...formData, microchip: e.target.value })}
                                placeholder="Ej: 123456789012345"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Notas Especiales</label>
                            <textarea
                                rows={3}
                                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2"
                                value={formData.notasEspeciales}
                                onChange={(e) => setFormData({ ...formData, notasEspeciales: e.target.value })}
                                placeholder="Comportamiento, dieta especial, medicamentos regulares, etc."
                            />
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 flex gap-4">
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
                    >
                        {isEditing ? "Actualizar" : "Guardar"}
                    </button>
                    {isEditing && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};
