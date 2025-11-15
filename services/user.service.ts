import { UserRepository } from "@/repositories/user.repo";

export const UserService = {
  getMe: (id: any) => UserRepository.findById(id),
  changeRole: (id: any, newRole: any) =>
    UserRepository.updateRole(id, newRole),
};
