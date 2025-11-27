import { LiabilityController } from "@/controllers/liability.controller";
import connectDB from "@/lib/db";

export const GET = async (req: Request) => {
    await connectDB();
    return LiabilityController.list(req);
};

export const POST = async (req: Request) => {
    await connectDB();
    return LiabilityController.create(req);
};
