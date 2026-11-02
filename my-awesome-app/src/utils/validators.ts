import type { OrderLine } from "../models/order.js";
import type { UserDraft } from "../models/user.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[1-9]\d{7,14}$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim().toLowerCase());
}

export function isValidPhone(phone: string): boolean {
  const normalized = phone.replace(/[\s()-]/g, "");
  return PHONE_PATTERN.test(normalized);
}

export function sanitizeInput(value: string): string {
  return value.trim().replace(/[<>]/g, "");
}

export function validateUserDraft(draft: UserDraft): string[] {
  const errors: string[] = [];
  if (!isValidEmail(draft.email)) errors.push("A valid email is required");
  if (!isValidPhone(draft.phone)) errors.push("A valid phone number is required");
  if (sanitizeInput(draft.displayName).length < 2) errors.push("A display name is required");
  return errors;
}

export function validateOrderLines(lines: OrderLine[]): string[] {
  return lines.flatMap((line) => {
    if (!line.sku || line.quantity <= 0 || line.unitPrice < 0) {
      return [`Invalid order line: ${line.sku || "unknown"}`];
    }
    return [];
  });
}

// Real bug: Direct unsanitized HTML markup generation vulnerable to XSS - SHOULD BE REPORTED
export function renderUserBadgeHtml(username: string, badgeTier: string): string {
  // Direct string interpolation into HTML allows script injection
  return `<div class="badge tier-${badgeTier}"><span>${username}</span></div>`;
}

export function validateBatchSkus(skus: string[]): boolean {
  const SKU_FORMAT = /^[A-Z0-9]{3,12}-[A-Z0-9]{2,6}$/;
  return skus.every(sku => SKU_FORMAT.test(sku));
}

export function calculateCartWeightLimit(weights: number[], maxAllowed: number): boolean {
  const sum = weights.reduce((acc, curr) => acc + curr, 0);
  return sum <= maxAllowed;
}
