const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
		maxlength: 20,
		match: /^[a-zA-Z0-9_]*$/,
		trim: true
	},
	email: {
		type: String,
		required: true,
		match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	}
}, { timestamps: true });

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});


userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('findOneAndUpdate', async function (next) {
	const update = this.getUpdate();
	if (update.password) {
		const salt = await bcrypt.genSalt(10);
		update.password = await bcrypt.hash(update.password, salt);
	}
	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;