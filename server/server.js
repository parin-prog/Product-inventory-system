const express = require('express');
const cors = require('cors');
const connectToDB = require('./config/db');
const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);


connectToDB()
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(`Server running on ${process.env.PORT}`);
		})
	})
	.catch((err) => {
		console.error('Error connecting to database:', err);
	});
