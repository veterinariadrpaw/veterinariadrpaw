import { AssetController } from "@/controllers/asset.controller";
import connectDB from "@/lib/db";

export const GET = async (req: Request) => {
    await connectDB();
    return AssetController.getById(req);
};

export const PUT = async (req: Request) => {
    await connectDB();
    return AssetController.update(req);
};

export const DELETE = async (req: Request) => {
    await connectDB();
    return AssetController.delete(req);
};
