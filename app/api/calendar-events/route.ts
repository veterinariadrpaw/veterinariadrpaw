import { CalendarEventController } from "@/controllers/calendar-event.controller";
import { NextResponse } from "next/server";
import { authMiddleware } from "@/middleware/auth.middleware";
import connectDB from "@/lib/db";

export async function GET(req: Request) {
    await connectDB();
    return CalendarEventController.listAll(req);
}

export async function POST(req: Request) {
    await connectDB();
    const user = await authMiddleware(req);
    if (!user || user.role !== "administrador") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return CalendarEventController.create(req);
}
