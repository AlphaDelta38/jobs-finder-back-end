import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from 'cors';

dotenv.config()

const app = express();
app.use(express.json());

const allowedOrigins = [
    'https://jobs-finder-front-end-jqew.vercel.app',
    'jobs-finder-front-end-jqew-hvwvtuaql-kirils-projects-63149d58.vercel.app',
    'http://localhost:3000'
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

connectDB()

app.use('/api/auth', authRoutes);

app.listen(process.env.PORT || 4000, () =>
    console.log(`Server started on port: ${process.env.PORT || 4000}`)
);
