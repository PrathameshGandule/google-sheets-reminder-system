import { connectDB } from "./config/db.js";
import { fetchSheetData } from "./helpers/sheetHelper.js";
import { deleteTask, insertTasks } from "./helpers/tasksHelper.js";
import { configDotenv } from "dotenv";
import { getTask } from "./helpers/tasksHelper.js";
import { sendMail } from "./helpers/mailSender.js";
import nodeCron from "node-cron";
import { updateLastNum } from "./helpers/lastNumHelper.js";
configDotenv();
connectDB();

console.log("email", process.env.USER_EMAIL);
console.log("pass", process.env.APP_PASS);
console.log("rec email", process.env.RECEIVER_MAIL);


nodeCron.schedule("*/1 * * * *", async () => {
	console.log("⏰ Running scheduled sheet fetch:", new Date().toLocaleString());
	try {
		const sheetData = await fetchSheetData();

		await updateLastNum(sheetData.length);
		await insertTasks(sheetData);

		// Process sheetData: save/update DB, etc.
	} catch (error) {
		console.error("❌ Cron job error:", error);
	}
});

nodeCron.schedule("*/2 * * * *", async () => {
	console.log("Checking for new tasks");
	try {
		const tasks = await getTask();
		for(let i=0 ; i<tasks.length ; i++){
			await sendMail(`${tasks[i].dateStr} ${tasks[i].timeStr}`, tasks[i].taskName);
			await deleteTask(tasks[i]._id);
		}
	} catch (error) {
		console.error("❌ Cron job error:", error);
	}
});