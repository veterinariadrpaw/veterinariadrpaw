import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import * as servicesController from "@/controllers/services.controller";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;
    return servicesController.deductServiceSupplies(id, req);
}
