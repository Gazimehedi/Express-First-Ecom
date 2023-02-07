import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/category.js';
const app = express();
dotenv.config();

mongoose
    .connect(process.env.DATABASE)
    .then(()=> console.log("database connected"))
    .catch((err) => console.log("database error ==> ", err));

// middleware 
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Route Middleware
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);
});