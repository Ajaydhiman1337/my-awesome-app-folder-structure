import { join as pathJoin } from "node:path";
import { createApp, describeApp } from "./app.js";
import appSettings, { getSetting as readSetting } from "./config/settings.js";
import Button, { renderButton as renderButtonMarkup } from "./components/button.js";
import Modal, { renderModal as renderModalMarkup } from "./components/modal.js";

const app = createApp();
console.log(describeApp(app));
const configuredAppName = readSetting("appName", appSettings.appName);

type StartupTask = {
	name: string;
	completed: boolean;
};

class StartupChecklist {
	private readonly tasks: StartupTask[] = [];

	addTask(name: string): void {
		this.tasks.push({ name, completed: false });
	}

	completeTask(name: string): void {
		const task = this.tasks.find((candidate) => candidate.name === name);
		if (task) {
			task.completed = true;
		}
	}

	get pendingTasks(): string[] {
		return this.tasks
			.filter((task) => !task.completed)
			.map((task) => task.name);
	}
}

function createStartupChecklist(): StartupChecklist {
	const checklist = new StartupChecklist();
	checklist.addTask("load configuration");
	checklist.addTask("connect to API");
	checklist.completeTask("load configuration");
	return checklist;
}

function formatStartupSummary(checklist: StartupChecklist): string {
	const pending = checklist.pendingTasks;
		const actionButton = Button({ label: "Continue", variant: "primary" });
		const actionMarkup = renderButtonMarkup(actionButton);
		const statusMarkup = renderModalMarkup({
				title: configuredAppName,
				content: "Startup status",
				isOpen: pending.length > 0,
		});
	return pending.length === 0
				? `Startup complete: ${actionMarkup}`
				: `Pending startup tasks: ${pending.join(", ")} ${statusMarkup}`;
}

const startupSummary = formatStartupSummary(createStartupChecklist());
console.log(startupSummary);

export function getAppDirectory(): string {
		return pathJoin(process.cwd(), app.appName);
}

export { app };

