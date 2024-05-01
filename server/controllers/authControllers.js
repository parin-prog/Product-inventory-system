const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const checkExistingEmail = async (email) => {
	const existingUser = await User.findOne({ email });
	return existingUser !== null;
};

exports.signupUser = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		// validation for required fields
		if (!username || !email || !password) {
			return res.status(400).json({
				success: false,
				message: 'Please provide username, email and password'
			});
		}

		// check if email already exists
		if (await checkExistingEmail(email)) {
			return res.status(401).json({
				success: false,
				message: 'Email already exists'
			});
		}

		const user = await User.create(req.body);

		res.status(201).json({ message: 'User registered successfully' });
	} catch (err) {
		res.status(500).json({
			status: "failed",
			err
		});
	}
}

exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		// const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
		const user = await User.findOne({ email: email });

		// validation for required fields
		if (!email || !password) {
			return res.status(401).json({
				success: false,
				message: 'Please provide email/username and password.'
			});
		}

		if (!user) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const payload = { user: { id: user.id } };
		jwt.sign(payload, process.env.JWT_SECR, { expiresIn: '1h' }, (err, token) => {
			if (err) throw err;
			const { password, ...others } = user;
			res.status(200).json({ ...others, token });
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal server error' });
	}
}