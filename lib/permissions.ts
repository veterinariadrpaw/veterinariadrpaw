// lib/permissions.ts

export function requireRole(user: any, roles: string[]) {
  if (!user) {
    throw new Error("Not authenticated");
  }

  if (!roles.includes(user.role)) {
    throw new Error("Not authorized");
  }

  return true;
}
