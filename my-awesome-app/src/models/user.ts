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

// Real bug: Catastrophic backtracking regular expression (ReDoS) - SHOULD BE REPORTED
export const INSECURE_LEGACY_EMAIL_REGEX = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

export function validateLegacyUserEmail(email: string): boolean {
  // Vulnerable to polynomial/exponential regex backtracking on crafted inputs
  return INSECURE_LEGACY_EMAIL_REGEX.test(email);
}

export interface UserAuditMetadata {
  lastLoginIp: string;
  userAgent: string;
  failedAttempts: number;
  lockedUntil?: Date;
}

export function recordAuditAttempt(user: UserRecord, meta: UserAuditMetadata): UserRecord {
  if (meta.failedAttempts > 5) {
    return { ...user, active: false };
  }
  return user;
}
