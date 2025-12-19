import mongoose, { Schema, Document } from "mongoose";

export interface IPetCare extends Document {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}

const PetCareSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String, required: true },
    link: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const PetCare = mongoose.models.PetCare || mongoose.model<IPetCare>("PetCare", PetCareSchema);
