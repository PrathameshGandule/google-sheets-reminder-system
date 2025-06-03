import { Tasks } from "../models/Tasks.js";

export const insertTasks = async (tasks) => {
	const dbTasks = convertToDbFormat(tasks);
	if (dbTasks.length > 0) {
		await Tasks.insertMany(dbTasks);
	}
};

export const deleteTask = async (taskId) => {
	await Tasks.findByIdAndDelete(taskId);
};

export const getTask = async () => {
	const nowUnix = Math.floor(Date.now() / 1000);
	const tenMinutesLaterUnix = nowUnix + 600;

	const tasks = await Tasks.find({
		taskTimeStamp: {
			$gte: nowUnix,
			$lte: tenMinutesLaterUnix,
		},
	});
	console.log("fetched tasks : ", tasks);
	return tasks;
};

const convertToDbFormat = (tasks) => {
	if (!Array.isArray(tasks) || tasks.length === 0) return [];
	const taskDocs = tasks
		.filter((row) => Array.isArray(row) && row.length >= 3) // safeguard
		.map(([dateStr, timeStr, taskName]) => {
			const dateTimeString = `${dateStr} ${timeStr}`;
			const timestamp = Math.floor(new Date(dateTimeString).getTime() / 1000); // UNIX time in seconds
			return {
				taskName,
				taskTimeStamp: timestamp,
				dateStr,
				timeStr,
			};
		});
	console.log("task documents : ", taskDocs);
	return taskDocs;
};
