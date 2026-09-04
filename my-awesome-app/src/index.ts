import { createApp, describeApp } from "./app.js";

const app = createApp();
console.log("[PR TEST]", describeApp(app));

export { app };

