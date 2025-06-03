import { LastNum } from "../models/LastNum.js";

export const rangeConstructor = async () => {
	const lastNum = await getLastNum();
	return `Sheet1!A${lastNum}:C`;
};

export const getLastNum = async () => {
	let doc = await LastNum.findOne();
	if (!doc) {
		doc = new LastNum(); // will use default: 2
		await doc.save();
	}
	return doc.lastNum;
};


export const updateLastNum = async (length) => {
	// simulating update
	// add +length in lastNum part in db here
	await LastNum.findOneAndUpdate(
		{},
		{
			$inc: { lastNum: length },
		}
	);
};
