import mongoose, { Schema, Document } from "mongoose";

export interface IGalleryImage extends Document {
    title: string;
    imageUrl: string; // Base64 string
    createdAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
    {
        title: {
            type: String,
            required: [true, "El título es obligatorio"],
            trim: true,
        },
        imageUrl: {
            type: String,
            required: [true, "La imagen es obligatoria"],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.GalleryImage ||
    mongoose.model<IGalleryImage>("GalleryImage", GalleryImageSchema);
