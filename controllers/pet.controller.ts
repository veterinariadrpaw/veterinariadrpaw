import { PetService } from "@/services/pet.service";
import { NextResponse , NextRequest} from "next/server";

export const PetController = {
  create: async (req : NextRequest, user: any) => {
    const data = await req.json();
    const pet = await PetService.create({ ...data, owner: user.id });
    return NextResponse.json(pet);
  },

  listByOwner: async (user: any) => {
    const pets = await PetService.listByOwner(user.id);
    return NextResponse.json(pets);
  },

  getOne: async (id: any) => {
    const pet = await PetService.getOne(id);
    return NextResponse.json(pet);
  },
};
