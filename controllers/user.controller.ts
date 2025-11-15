
import { UserService } from "@/services/user.service";
import { NextResponse } from "next/server";

export const UserController = {
  // Obtener datos del usuario autenticado
  me: async (user: any) => {
    const result = await UserService.getMe(user.id);
    return NextResponse.json(result);
  },

  // Cambiar el rol de un usuario (solo admin)
  changeRole: async (req: Request) => {
    const body = await req.json();
    const { userId, newRole } = body;

    const updatedUser = await UserService.changeRole(userId, newRole);

    return NextResponse.json({
      message: "Rol actualizado correctamente",
      user: updatedUser,
    });
  },
};
