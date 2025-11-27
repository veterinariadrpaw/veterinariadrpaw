import { UserController } from "@/controllers/user.controller";
import connectDB from "@/lib/db";

export const GET = async (req: Request) => {
    await connectDB();
    return UserController.me(req);
};

export const PATCH = async (req: Request) => {
    await connectDB();
    return UserController.updateMe(req);
};
