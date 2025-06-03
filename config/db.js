import mongoose from "mongoose";

const MONGODB_URI =
	process.env.MONGODB_URI || "mongodb://localhost:27017/taskDB";

async function connectDB() {
	try {
		await mongoose.connect(MONGODB_URI);
		console.log("✅ MongoDB connected");
	} catch (error) {
		console.error("❌ MongoDB connection error:", error);
		process.exit(1);
	}
}

async function disconnectDB() {
	try {
		await mongoose.disconnect();
		console.log("🛑 MongoDB disconnected");
	} catch (error) {
		console.error("❌ MongoDB disconnection error:", error);
	}
}

export { connectDB, disconnectDB };