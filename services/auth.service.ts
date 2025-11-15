import bcrypt from "bcryptjs";
import { UserRepository } from "@/repositories/user.repo";
import { signToken } from "@/lib/jwt";

export const AuthService = {
  register: async (data: any) => {
    const hashed = await bcrypt.hash(data.password, 10);
    const user: any = await UserRepository.create({ ...data, password: hashed });

    // 🔥 Remover password de la respuesta
    const { password, ...safeUser } = user.toObject();

    return safeUser;
  },

  login: async (email: string, password: string) => {
    const user: any = await UserRepository.findByEmail(email);
    if (!user) throw new Error("Usuario no encontrado");

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new Error("Credenciales incorrectas");

    const token = signToken({ id: user._id, role: user.role });

    // También eliminamos password aquí
    const { password: _, ...safeUser } = user.toObject();

    return { user: safeUser, token };
  },
};
