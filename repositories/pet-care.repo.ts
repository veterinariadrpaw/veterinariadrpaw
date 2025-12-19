import { PetCare, IPetCare } from "@/models/PetCare";
import dbConnect from "@/lib/db";
import { UpdateQuery } from "mongoose";

export const PetCareRepository = {
    create: async (data: Partial<IPetCare>) => {
        await dbConnect();
        return PetCare.create(data);
    },

    findAll: async () => {
        await dbConnect();
        return PetCare.find().sort({ createdAt: -1 }).lean();
    },

    findById: async (id: string) => {
        await dbConnect();
        return PetCare.findById(id).lean();
    },

    updateById: async (id: string, data: UpdateQuery<IPetCare>) => {
        await dbConnect();
        return PetCare.findByIdAndUpdate(id, data, { new: true });
    },

    deleteById: async (id: string) => {
        await dbConnect();
        return PetCare.findByIdAndDelete(id);
    },
};
