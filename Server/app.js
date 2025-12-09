import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import 'dotenv/config';
import session from "express-session";
import AuthRoutes from "./Routes/AuthRoutes.js";
import PaymentRoutes from './Routes/PaymentRoutes.js';

connectDB();
const app = express();
app.use(express.json());

app.use(cors());

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:true,
        httpOnly:true,
        sameSite:"none",
        maxAge: 1000 * 60 * 60 * 24 * 7 
    }
}));

app.use('/auth',AuthRoutes);
app.use('/payment', PaymentRoutes);

app.use((err,req,res,next)=> {
    console.error(err.stack);
    res.status(500).json({
        success:false, 
        message: 'Somemthing went wrong! ',
        error: err.message
    });
 });



const port = process.env.PORT ;
app.listen(port , () => {console.log(`connected at port ${port}`)});
