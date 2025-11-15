import { User } from "@/models/User";

export const UserRepository = {
  create: (data: any) => User.create(data),
  findByEmail: (email: any) => User.findOne({ email }),
  findById: (id: any) => User.findById(id),
  updateRole: (id: any, role: any) => User.findByIdAndUpdate(id, { role }, { new: true }),
};
