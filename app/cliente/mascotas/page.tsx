"use client";

import { useState, useEffect } from "react";
import { Pet } from "@/types/pet";
import { PetForm } from "@/components/cliente/mascotas/PetForm";
import { PetList } from "@/components/cliente/mascotas/PetList";

export default function MyPetsPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const res = await fetch("/api/pets?my_pets=true");
      if (res.ok) {
        const data = await res.json();
        setPets(data);
      }
    } catch (error) {
      console.error("Error fetching pets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      const url = editingPet ? `/api/pets?id=${editingPet._id}` : "/api/pets";
      const method = editingPet ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowForm(false);
        setEditingPet(null);
        fetchPets();
      }
    } catch (error) {
      console.error("Error saving pet:", error);
    }
  };

  const handleEdit = (pet: Pet) => {
    setEditingPet(pet);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta mascota?")) return;

    try {
      const res = await fetch(`/api/pets?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchPets();
      }
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingPet(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Mis Mascotas</h1>
        <button
          onClick={() => {
            if (showForm) cancelForm();
            else setShowForm(true);
          }}
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
        >
          {showForm ? "Cancelar" : "Nueva Mascota"}
        </button>
      </div>

      {showForm && (
        <PetForm
          initialData={editingPet}
          onSubmit={handleSubmit}
          onCancel={cancelForm}
          isEditing={!!editingPet}
        />
      )}

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <PetList
          pets={pets}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showForm={showForm}
        />
      )}
    </div>
  );
}
