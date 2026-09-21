export type UserRole = "customer" | "admin";

export interface UserRecord {
  id: string;
  email: string;
  phone: string;
  displayName: string;
  role: UserRole;
  createdAt: Date;
  active: boolean;
}

export type UserDraft = Pick<UserRecord, "email" | "phone" | "displayName"> & {
  role?: UserRole;
};

export function createUserRecord(id: string, draft: UserDraft): UserRecord {
  return {
    id,
    email: draft.email,
    phone: draft.phone,
    displayName: draft.displayName,
    role: draft.role ?? "customer",
    createdAt: new Date(),
    active: true,
  };
}

export function deactivateUser(user: UserRecord): UserRecord {
  return { ...user, active: false };
}

export default createUserRecord;
