import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await connectDB();

  const { email, password, role } = await req.json();
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashed,
    role: role || "cliente",
  });

  // Convertimos a objeto plano
  const userObj = user.toObject();

  // Quitamos el password
  delete userObj.password;

  return Response.json(userObj, { status: 201 });
}
