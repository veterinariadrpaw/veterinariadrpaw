import { AuthService } from "@/services/auth.service";
import { NextResponse } from "next/server";

export const AuthController = {
  register: async (req: Request) => {
    const data = await req.json();
    const user = await AuthService.register(data);

    // 🛡️ Seguridad: remover password del objeto
    const sanitizedUser = user.toObject ? user.toObject() : user;
    delete sanitizedUser.password;

    return NextResponse.json(sanitizedUser);
  },

  login: async (req: Request) => {
    const data = await req.json();
    const result = await AuthService.login(data.email, data.password);

    // En login no devolvemos password tampoco (tu service ya lo hace bien)
    return NextResponse.json(result);
  },
};
