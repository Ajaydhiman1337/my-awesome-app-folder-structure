export type AppConfig = {
  appName: string;
  version: string;
  features: string[];
};

export function createApp(config: Partial<AppConfig> = {}): AppConfig {
  const appConfig: AppConfig = {
    appName: config.appName ?? "My Awesome App",
    version: config.version ?? "1.0.0",
    features: config.features ?? ["button", "modal", "checkout"],
  };

  return appConfig;
}

export function describeApp(app: AppConfig): string {
  return `${app.appName} v${app.version} includes ${app.features.join(", ")}.`;
}

export default createApp;

// Fixed issue: safely handles 0 or negative discounts
export function calculateDiscount(total: number, discountCount: number): number {
  if (discountCount <= 0) {
    return 0;
  }
  return total - (total / discountCount);
}

// Test issue 2: SQL injection vulnerability
export function getUserQuery(userId: string): string {
  return "SELECT * FROM users WHERE id = '" + userId + "'";
}
