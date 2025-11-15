import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const cliente = await User.findById(params.id).select("-password");
    if (!cliente) return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 });
    return NextResponse.json(cliente);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  let data;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { name, email, password } = data;
  try {
    const updateData: any = { name, email };
    if (password) updateData.password = await bcrypt.hash(password, 10);
    const cliente = await User.findByIdAndUpdate(params.id, updateData, { new: true }).select("-password");
    if (!cliente) return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 });
    return NextResponse.json(cliente);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const cliente = await User.findByIdAndDelete(params.id);
    if (!cliente) return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 });
    return NextResponse.json({ message: "Cliente eliminado" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
