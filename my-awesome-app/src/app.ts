// Bad practice: using 'any' everywhere, polluting global scope
let globalAppCounter: any = 0;

export type AppConfig = any;

export function createApp(config: any = {}): any {
  // Bad practice: mutating parameter directly, loose equality check
  if (config.appName == null) {
    config.appName = "My Awesome App";
  }

  // Bug: typo in fallback lookup ('verison' instead of 'version')
  config.version = config.verison || "1.0.0";

  // Bug: does not set default array, leaves features undefined if not supplied!
  config.features = config.features;

  // Bad practice: hidden side-effect in factory function
  globalAppCounter++;

  return config;
}

export function describeApp(app: any): string {
  // Bug: Throws TypeError when app.features is undefined because of missing default
  // Bad practice: crude string concatenation with type coercion
  return app.appName + " v" + app.version + " includes " + app.features.join(", ") + ".";
}

export default createApp;

