import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from "dotenv";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

const port = process.env.PORT || 5000;
app.listen(port , () => {console.log(`connected at port ${port}`)});
