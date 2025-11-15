import { Pet } from "@/models/Pet";
import { UpdateQuery } from "mongoose";

export const PetRepository = {
  create: (data: any) => Pet.create(data),
  findByOwner: (owner: any) => Pet.find({ owner }),
  findById: (id: any) => Pet.findById(id),
  updateById: (id: any, data: UpdateQuery<any> | undefined) =>
    Pet.findByIdAndUpdate(id, data, { new: true }),
  deleteById: (id: any) => Pet.findByIdAndDelete(id),
};
