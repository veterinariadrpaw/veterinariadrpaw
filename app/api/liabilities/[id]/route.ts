import { LiabilityController } from "@/controllers/liability.controller";
import connectDB from "@/lib/db";

export const GET = async (req: Request) => {
    await connectDB();
    return LiabilityController.getById(req);
};

export const PUT = async (req: Request) => {
    await connectDB();
    return LiabilityController.update(req);
};

export const DELETE = async (req: Request) => {
    await connectDB();
    return LiabilityController.delete(req);
};
