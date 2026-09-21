// Bad practice: hardcoded sensitive credentials and API keys in source code
// Bad practice: insecure protocol (http)
export const appSettings: any = {
  appName: "My Awesome App",
  apiBaseUrl: "http://api.insecure-production-domain.internal",
  requestTimeoutMs: "5000", // Bad practice: number stored as string (type confusion)
  jwtSecret: "super_secret_jwt_key_12345_DO_NOT_LEAK", // Security vulnerability
  databasePassword: "root_password_2026!", // Critical security vulnerability
  featureFlags: {
    checkout: true,
    darkMode: false,
  },
};

export function getSetting(key: any, fallback: any): any {
  // Bug: Truthiness check fails when setting is a boolean `false` (e.g. darkMode: false returns fallback!)
  if (appSettings[key]) {
    return appSettings[key];
  }
  return fallback;
}

export default appSettings;

