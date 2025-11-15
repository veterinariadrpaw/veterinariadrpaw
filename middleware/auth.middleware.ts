import { verifyToken } from "@/lib/jwt";
import { UserPayload } from "@/types/auth";

export async function authMiddleware(req: Request): Promise<UserPayload | null> {
  const header = req.headers.get("authorization");

  if (!header) return null;

  const token = header.split(" ")[1];
  if (!token) return null;

  try {
    const decoded = verifyToken(token) as UserPayload;
    return decoded;
  } catch {
    return null;
  }
}
