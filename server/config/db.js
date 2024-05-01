const { mongoose } = require("mongoose");

const connectToDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI)
			.then(() => {
				console.log("DB connected");
			})
	} catch (err) {
		console.error(err);
		throw err;
	}
}

module.exports = connectToDB;