//requireRole.ts
import { requireRole as requireRoleFn } from "@/lib/permissions";

export function requireRole(user: any, roles: string[]) {
  requireRoleFn(user, roles);
}
