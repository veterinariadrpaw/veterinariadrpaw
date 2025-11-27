import { CashFlowController } from "@/controllers/cashflow.controller";
import connectDB from "@/lib/db";

export const DELETE = async (req: Request) => {
    await connectDB();
    return CashFlowController.delete(req);
};
