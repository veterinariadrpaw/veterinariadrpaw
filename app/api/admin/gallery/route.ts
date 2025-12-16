import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import GalleryImage from "@/models/GalleryImage";

export async function GET() {
    try {
        await dbConnect();
        const images = await GalleryImage.find().sort({ createdAt: -1 });
        return NextResponse.json(images);
    } catch (error) {
        console.error("Error fetching gallery images:", error);
        return NextResponse.json(
            { error: "Error al obtener las imágenes" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        if (!body.title || !body.imageUrl) {
            return NextResponse.json(
                { error: "Título e imagen son requeridos" },
                { status: 400 }
            );
        }

        const newImage = await GalleryImage.create(body);
        return NextResponse.json(newImage, { status: 201 });
    } catch (error) {
        console.error("Error creating gallery image:", error);
        return NextResponse.json(
            { error: "Error al guardar la imagen" },
            { status: 500 }
        );
    }
}
