import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from "dotenv";
import AuthRoutes from "./Routes/AuthRoutes.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(session({
    secret:"nihal_bhai_tanmay_bhai_shlok_bhai",
    resave:false,
    saveUninitialized:true,
    cookie:{
        secure:false,
        httpOnly:true,
        sameSite:"lax"
    }

}));
app.use('/auth',AuthRoutes);

const port = process.env.PORT || 5000;
app.listen(port , () => {console.log(`connected at port ${port}`)});
