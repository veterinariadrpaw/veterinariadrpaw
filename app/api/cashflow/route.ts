import { CashFlowController } from "@/controllers/cashflow.controller";
import connectDB from "@/lib/db";

export const GET = async (req: Request) => {
    await connectDB();
    return CashFlowController.list(req);
};

export const POST = async (req: Request) => {
    await connectDB();
    return CashFlowController.create(req);
};
