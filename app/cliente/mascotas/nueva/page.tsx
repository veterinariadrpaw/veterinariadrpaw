"use client";

import { useState, useEffect } from "react";
import { createPet } from "@/services/cliente/pet.service";
import { Input } from "@/components/ui/Input";

export default function NuevaMascota() {
  const [form, setForm] = useState({
    nombre: "",
    especie: "",
    edad: "",
    raza: "",
  });

  const [token, setToken] = useState("");

  // ✅ Solo se ejecuta en el navegador (fix SSR build)
  useEffect(() => {
    const t = localStorage.getItem("token") || "";
    setToken(t);
  }, []);

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!token) {
      alert("No hay token. Inicia sesión primero.");
      return;
    }

    await createPet(
      { ...form, edad: Number(form.edad) },
      token
    );

    window.location.href = "/cliente/mascotas";
  }

  return (
    <div>
      <h1>Nueva Mascota</h1>

      <form onSubmit={handleSubmit}>
        <Input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" />
        <Input name="especie" value={form.especie} onChange={handleChange} placeholder="Especie" />
        <Input name="edad" value={form.edad} onChange={handleChange} placeholder="Edad" />
        <Input name="raza" value={form.raza} onChange={handleChange} placeholder="Raza" />

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
