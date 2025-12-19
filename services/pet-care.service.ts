import { PetCareRepository } from "@/repositories/pet-care.repo";
import { IPetCare } from "@/models/PetCare";
import { UpdateQuery } from "mongoose";

export const PetCareService = {
    create: (data: Partial<IPetCare>) => PetCareRepository.create(data),
    listAll: () => PetCareRepository.findAll(),
    getOne: (id: string) => PetCareRepository.findById(id),
    update: (id: string, data: UpdateQuery<IPetCare>) => PetCareRepository.updateById(id, data),
    delete: (id: string) => PetCareRepository.deleteById(id),
};
