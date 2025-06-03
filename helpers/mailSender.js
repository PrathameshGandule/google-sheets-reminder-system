import { createTransport } from "nodemailer";
import { configDotenv } from "dotenv";
configDotenv();

// transporter to send mail
const transporter = createTransport({
	service: "Gmail",
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: process.env.USER_EMAIL,
		pass: process.env.APP_PASS,
	},
});

// otp sender function
const sendMail = async (taskTime, taskName) => {
	// mail sender configuration
	const mailToSend = process.env.RECEIVER_MAIL;
	const mailOptions = {
		from: process.env.USER_EMAIL,
		to: mailToSend,
		subject: `Your scheduled task at ${taskTime}`,
		html: `Task description\n<h1>${taskName}</h1>`,
	};

	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.error("❌ Error sending email: ", error);
	}
};

export { sendMail };
