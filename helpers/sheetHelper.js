import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { rangeConstructor } from "./lastNumHelper.js";

// __dirname workaround in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup Google Auth
const auth = new GoogleAuth({
	keyFile: path.join(__dirname, "..", "service-account.json"),
	scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

export async function fetchSheetData() {
	try {
		const authClient = await auth.getClient();
		const sheets = google.sheets({ version: "v4", auth: authClient });

		const spreadsheetId = process.env.SHEET_ID; // Replace with your actual ID
		const range = await rangeConstructor(); // Adjust as needed

		const response = await sheets.spreadsheets.values.get({
			spreadsheetId,
			range,
		});
		const rows = response.data.values;
		// updateLastNum(response.length);
		if (!rows || rows.length === 0) {
			return [];
		}

		console.log("✅ Sheet Data:", rows);	
		return rows;
	} catch (error) {
		console.error("❌ Error fetching sheet data:", error);
	}
}
