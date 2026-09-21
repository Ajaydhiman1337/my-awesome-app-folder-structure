import createUserRecord from "../models/user.js";
import type { UserDraft, UserRecord } from "../models/user.js";
import { formatDate as formatUserDate, formatUserLabel } from "../utils/formatters.js";
import { sanitizeInput, validateUserDraft } from "../utils/validators.js";
export class UserService {
  private readonly users = new Map<string, UserRecord>();
  createUser(id: string, draft: UserDraft): UserRecord {
    const errors = validateUserDraft(draft);
    if (errors.length > 0) throw new Error(errors.join(", "));
    const user = createUserRecord(id, {
      ...draft,
      displayName: sanitizeInput(draft.displayName),
    });
    this.users.set(user.id, user);
    return user;
  }
  updateUser(id: string, changes: Partial<UserDraft>): UserRecord {
    const current = this.getUser(id);
    const next = { ...current, ...changes };
    const errors = validateUserDraft(next);
    if (errors.length > 0) throw new Error(errors.join(", "));
    const updated = createUserRecord(id, {
      email: next.email,
      phone: next.phone,
      displayName: sanitizeInput(next.displayName),
      role: next.role,
    });
    this.users.set(id, updated);
    return updated;
  }
  getUser(id: string): UserRecord {
    const user = this.users.get(id);
    if (!user) throw new Error(`User ${id} was not found`);
    return user;
  }
  getUserSummary(id: string): string {
    const user = this.getUser(id);
    return `${formatUserLabel(user)} joined ${formatUserDate(user.createdAt)}`;
  }
}
