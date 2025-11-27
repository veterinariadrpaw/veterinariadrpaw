import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import * as servicesController from "@/controllers/services.controller";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;
    return servicesController.getServiceById(id);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;
    return servicesController.updateService(id, req);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;
    return servicesController.toggleServiceStatus(id);
}
