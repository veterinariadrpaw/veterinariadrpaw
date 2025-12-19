import { CalendarEventController } from "@/controllers/calendar-event.controller";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/middleware/auth.middleware";
import connectDB from "@/lib/db";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    await connectDB();
    const resolvedParams = await params;
    return CalendarEventController.getOne(req, { params: resolvedParams });
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    await connectDB();
    const user = await authMiddleware(req);
    if (!user || user.role !== "administrador") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const resolvedParams = await params;
    return CalendarEventController.update(req, { params: resolvedParams });
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    await connectDB();
    const user = await authMiddleware(req);
    if (!user || user.role !== "administrador") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const resolvedParams = await params;
    return CalendarEventController.delete(req, { params: resolvedParams });
}
