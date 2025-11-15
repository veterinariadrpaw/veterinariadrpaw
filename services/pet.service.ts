import { PetRepository } from "@/repositories/pet.repo";
import { UpdateQuery } from "mongoose";

export const PetService = {
  create: (data: any) => PetRepository.create(data),
  listByOwner: (owner: any) => PetRepository.findByOwner(owner),
  getOne: (id: any) => PetRepository.findById(id),
  update: (id: any, data: UpdateQuery<any> | undefined) => PetRepository.updateById(id, data),
  delete: (id: any) => PetRepository.deleteById(id),
};
