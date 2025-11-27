import { CashFlowController } from "@/controllers/cashflow.controller";
import connectDB from "@/lib/db";

export const GET = async (req: Request) => {
    await connectDB();
    return CashFlowController.stats(req);
};
