// RBAC, roles-list
export const ROLES = {
    SUPERADMIN: 5150, // super admin role
    ADMIN: 1984, // admin role
    USER: 2001, // basic user role
} as const;

export const ROLE_LABEL: Record<number, string> = {
  5150: "superadmin",
  1984: "admin",
  2001: "user",
};