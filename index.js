import express from 'express';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
console.log(process.env.MONGO_DB_CONNECTION_URL)
