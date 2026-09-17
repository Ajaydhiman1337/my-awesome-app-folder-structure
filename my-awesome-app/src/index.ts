import { createApp, describeApp } from "./app.js";

const app = createApp();
console.log("[PR TEST]", describeApp(app));

export function getAppDirectory(): string {
	return join(process.cwd(), app.appName);
}

export { app };

