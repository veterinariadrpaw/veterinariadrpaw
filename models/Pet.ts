// /models/Pet.ts
import { Schema, model, models } from "mongoose";
import "./User"; // Registrar el modelo User

const PetSchema = new Schema(
  {
    nombre: { type: String, required: true },
    especie: { type: String, required: true }, // perro, gato, etc.
    edad: { type: Number, required: true },
    raza: { type: String, required: true },

    // dueño de la mascota (cliente)
    propietario: { type: Schema.Types.ObjectId, ref: "User", required: true },

    // veterinario asignado
    assignedVet: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Pet = models.Pet || model("Pet", PetSchema);
