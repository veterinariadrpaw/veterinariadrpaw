import { CalendarEventService } from "@/services/calendar-event.service";
import { NextResponse } from "next/server";
import { apiHandler, AppError } from "@/lib/api-handler";
import { z } from "zod";

const calendarEventSchema = z.object({
    title: z.string().min(1, "El título es requerido"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
    description: z.string().min(1, "La descripción es requerida"),
    location: z.string().optional(),
});

export const CalendarEventController = {
    create: apiHandler(async (req: Request) => {
        const body = await req.json();
        const data = calendarEventSchema.parse(body);
        const item = await CalendarEventService.create(data as any);
        return NextResponse.json(item, { status: 201 });
    }),

    listAll: apiHandler(async (req: Request) => {
        const items = await CalendarEventService.listAll();
        return NextResponse.json(items);
    }),

    getOne: apiHandler(async (req: Request, { params }: { params: { id: string } }) => {
        const item = await CalendarEventService.getOne(params.id);
        if (!item) throw new AppError("Evento no encontrado", 404);
        return NextResponse.json(item);
    }),

    update: apiHandler(async (req: Request, { params }: { params: { id: string } }) => {
        const body = await req.json();
        const data = calendarEventSchema.partial().parse(body);
        const item = await CalendarEventService.update(params.id, data as any);
        if (!item) throw new AppError("Evento no encontrado", 404);
        return NextResponse.json(item);
    }),

    delete: apiHandler(async (req: Request, { params }: { params: { id: string } }) => {
        const item = await CalendarEventService.delete(params.id);
        if (!item) throw new AppError("Evento no encontrado", 404);
        return NextResponse.json({ message: "Evento eliminado correctamente" });
    }),
};
