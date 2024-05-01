const Category = require("../models/Category")

exports.addCategory = async (req, res) => {
	try {
		const category = await Category.create(req.body);

		res.status(201).json({
			category
		})
	} catch (err) {
		res.status(500).json({
			status: "failed",
			err
		})
	}
}

exports.updateCategory = async (req, res) => {
	try {
		const cat = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });

		res.status(200).json({
			cat
		});
	} catch (err) {
		res.status(500).json({
			status: 'failed',
			err
		});
	}
}

exports.deleteCategory = async (req, res) => {
	try {
		const cat = await Category.findByIdAndDelete(req.params.id);

		res.status(200).json({
			cat
		});
	} catch (err) {
		res.status(500).json({
			status: 'failed',
			err
		});
	}
}

exports.getCategories = async (req, res) => {
	try {
		const cat = await Category.find({});

		res.status(200).json({
			cat
		});
	} catch (err) {
		res.status(500).json({
			status: "failed",
			err
		})
	}
}

exports.getCategory = async (req, res) => {
	try {
		const cat = await Category.findById(req.params.id);

		res.status(200).json({
			cat
		});
	} catch (err) {
		res.status(500).json({
			status: "failed",
			err
		})
	}
}
