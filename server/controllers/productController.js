const Product = require("../models/Product")

exports.addProduct = async (req, res) => {
	try {
		const newProduct = await Product.create(req.body);

		res.status(201).json({
			newProduct
		})
	} catch (err) {
		res.status(500).json({
			status: 'failed',
			err
		});
	}
}

exports.updateProduct = async (req, res) => {
	try {
		const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

		res.status(200).json({
			product
		});
	} catch (err) {
		res.status(500).json({
			status: 'failed',
			err
		});
	}
}

exports.deleteProduct = async (req, res) => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id);

		res.status(200).json({
			product
		});
	} catch (err) {
		res.status(500).json({
			status: 'failed',
			err
		});
	}
}

exports.getProducts = async (req, res) => {
	try {
		const products = await Product.find({});

		res.status(200).json({
			products
		});
	} catch (err) {
		res.status(500).json({
			status: "failed",
			err
		})
	}
}

exports.getProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		res.status(200).json({
			product
		});
	} catch (err) {
		res.status(500).json({
			status: "failed",
			err
		})
	}
}

exports.getProductCategories = async (req, res) => {
	try {
		const product = await Product.findOne({ _id: req.params.id }).populate('category');
		if (!product) {
			throw new Error('Product not found');
		}
		res.status(200).json({
			product
		})
	} catch (error) {
		console.error('Error fetching categories:', error);
		return null;
	}
};