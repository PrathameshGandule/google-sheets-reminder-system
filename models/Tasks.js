import { Schema, model } from "mongoose";

const tasksSchema = new Schema(
	{
		dateStr: { type: String, required: true },
		timeStr: { type: String, required: true },
		taskTimeStamp: { type: Date, required: true },
		taskName: { type: String, required: true },
	},
	{ timestamps: true },
);

const Tasks = model("Tasks", tasksSchema);
export { Tasks };
