import {register} from "../controllers/Register.js";
import express from "express";
import {login} from "../controllers/Login.js";
import {verifyOtp} from "../controllers/VerifiedOtp.js";

const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/verify-otp", verifyOtp );


export default router;
