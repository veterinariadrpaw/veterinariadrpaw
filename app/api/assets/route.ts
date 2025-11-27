import { AssetController } from "@/controllers/asset.controller";
import connectDB from "@/lib/db";

export const GET = async (req: Request) => {
    await connectDB();
    return AssetController.list(req);
};

export const POST = async (req: Request) => {
    await connectDB();
    return AssetController.create(req);
};
