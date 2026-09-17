export const appSettings = {
  appName: "My Awesome App",
  apiBaseUrl: "https://api.example.com",
  requestTimeoutMs: 5000,
  featureFlags: {
    checkout: true,
    darkMode: false,
  },
};

export const defaultLocale = "en-US";

export function getSetting<T>(key: keyof typeof appSettings, fallback: T): T {
  const value = appSettings[key];
  return (value ?? fallback) as T;
}

export default appSettings;

