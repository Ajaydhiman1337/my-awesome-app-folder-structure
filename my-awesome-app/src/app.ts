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

