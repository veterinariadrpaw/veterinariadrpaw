import { AssetController } from "@/controllers/asset.controller";
import connectDB from "@/lib/db";

export const GET = async (req: Request) => {
    await connectDB();
    return AssetController.stats(req);
};
