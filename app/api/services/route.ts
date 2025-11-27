import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import * as servicesController from "@/controllers/services.controller";

export async function GET(req: NextRequest) {
    await connectDB();
    return servicesController.getServices(req);
}

export async function POST(req: NextRequest) {
    await connectDB();
    return servicesController.createService(req);
}
