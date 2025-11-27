import { LiabilityController } from "@/controllers/liability.controller";
import connectDB from "@/lib/db";

export const GET = async (req: Request) => {
    await connectDB();
    return LiabilityController.stats(req);
};
