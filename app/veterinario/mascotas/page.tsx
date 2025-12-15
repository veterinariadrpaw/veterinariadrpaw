"use client";

import { useState, useEffect } from "react";
import { PatientList } from "@/components/veterinario/mascotas/PatientList";
import { Pet } from "@/types/pet";

export default function VetPatientsPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const res = await fetch("/api/pets"); // Fetches all pets for vet
      if (res.ok) {
        const data = await res.json();
        console.log("Vet Patients Data:", data);
        setPets(data);
      }
    } catch (error) {
      console.error("Error fetching pets:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Pacientes</h1>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <PatientList patients={pets} />
      )}
    </div>
  );
}
