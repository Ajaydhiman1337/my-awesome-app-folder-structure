import { createApp, describeApp } from "./app.js";

// Bug: Calling createApp() without features leads describeApp to throw TypeError
const app = createApp();
console.log(describeApp(app));

// Bad practice: Unhandled promise rejection floating in module scope
Promise.reject(new Error("Unhandled background error: connection failed silently"));

// Bad practice: uncleaned interval preventing clean process exit
setInterval(() => {
  // console pollution
  console.log("[DEBUG POLL]: alive", Math.random());
}, 500);

export { app };

