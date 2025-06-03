import { Schema, model } from "mongoose";

const lastNumSchema = new Schema(
	{
		lastNum: { type: Number, default: 2 },
	},
	{ timestamps: true },
);

const LastNum = model("LastNum", lastNumSchema);

export { LastNum };
