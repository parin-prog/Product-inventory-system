const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	img: {
		type: String,
		default: ""
	},
	price: {
		type: Number,
		required: true,
		min: 0
	},
	category: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
			// required: true
		}
	],
	status: {
		type: Number,
		default: 0
	}
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;