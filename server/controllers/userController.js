const User = require("../models/User")

exports.getUser = async (req, res) => {
	try {

		const { id } = req.user;

		//check whether user is logged in
		if (!id) {
			return res.status(401).json({
				success: false,
				message: 'Please login to access this route'
			});
		}

		// get user by id
		const user = await User.findById(id);

		// validation for user
		if (!user) {
			return res.status(401).json({
				success: false,
				message: 'User not found'
			});
		}

		res.status(200).json({
			user
		});
	} catch (err) {
		res.status(500).json({
			status: "failed",
			err
		})
	}
}

exports.updateUser = async (req, res) => {
	try {
		const { id } = req.user;

		//check whether user is logged in
		if (!id) {
			return res.status(401).json({
				success: false,
				message: 'Please login to access this route'
			});
		}

		const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

		// validation for user
		if (!updatedUser) {
			return res.status(401).json({
				success: false,
				message: 'User not found'
			});
		}

		res.status(200).json({
			updatedUser
		})
	} catch (err) {
		res.status(500).json({
			status: "failed",
			err
		})
	}
}

exports.deleteUser = async (req, res) => {
	try {
		const { id } = req.user;

		//check whether user is logged in
		if (!id) {
			return res.status(401).json({
				success: false,
				message: 'Please login to access this route'
			});
		}

		await User.findByIdAndDelete(id);

		res.status(200).json({
			status: "success",
			msg: "User deleted"
		});
	} catch (err) {
		res.status(500).json({
			status: "failed",
			err
		})
	}
}