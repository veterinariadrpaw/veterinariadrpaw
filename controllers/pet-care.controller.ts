import { PetCareService } from "@/services/pet-care.service";
import { NextResponse } from "next/server";
import { apiHandler, AppError } from "@/lib/api-handler";
import { z } from "zod";

const petCareSchema = z.object({
    title: z.string().min(1, "El título es requerido"),
    excerpt: z.string().min(1, "El extracto es requerido"),
    category: z.string().min(1, "La categoría es requerida"),
    link: z.string().url("Debe ser una URL válida"),
    date: z.string().min(1, "La fecha es requerida"),
});

export const PetCareController = {
    create: apiHandler(async (req: Request) => {
        const body = await req.json();
        const data = petCareSchema.parse(body);
        const item = await PetCareService.create(data as any);
        return NextResponse.json(item, { status: 201 });
    }),

    listAll: apiHandler(async (req: Request) => {
        const items = await PetCareService.listAll();
        return NextResponse.json(items);
    }),

    getOne: apiHandler(async (req: Request, { params }: { params: { id: string } }) => {
        const item = await PetCareService.getOne(params.id);
        if (!item) throw new AppError("Artículo no encontrado", 404);
        return NextResponse.json(item);
    }),

    update: apiHandler(async (req: Request, { params }: { params: { id: string } }) => {
        const body = await req.json();
        const data = petCareSchema.partial().parse(body);
        const item = await PetCareService.update(params.id, data as any);
        if (!item) throw new AppError("Artículo no encontrado", 404);
        return NextResponse.json(item);
    }),

    delete: apiHandler(async (req: Request, { params }: { params: { id: string } }) => {
        const item = await PetCareService.delete(params.id);
        if (!item) throw new AppError("Artículo no encontrado", 404);
        return NextResponse.json({ message: "Artículo eliminado correctamente" });
    }),
};
