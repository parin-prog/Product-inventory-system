const jwt = require("jsonwebtoken")

// JWT middleware for authentication
const verifyToken = (req, res, next) => {
	const token = req.header('token');

	if (!token) {
		return res.status(401).json({ message: 'No token, authorization denied' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECR);
		req.user = decoded.user;
		next();
	} catch (error) {
		res.status(401).json({ message: 'Token is not valid' });
	}
};

module.exports = { verifyToken }