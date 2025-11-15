import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
    veterinarian: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: Date,
    reason: String,
    status: {
      type: String,
      enum: ["pendiente", "aceptada", "cancelada"],
      default: "pendiente",
    },
  },
  { timestamps: true }
);

export const Appointment =
  mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);
