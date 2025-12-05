import {register} from "../controllers/Register.js";
import express from "express";
import {login} from "../controllers/Login.js";
import {verifyOtp} from "../controllers/VerifiedOtp.js";
import {forgotPassword} from "../controllers/forgotPassword.js";
import {logout} from "../controllers/logout.js";
import {resend_otp} from "../controllers/resendOtp.js";
import {resetPassword} from "../controllers/resetPassword.js";
import {verify_reset_pass_otp} from "../controllers/verifyresetPassOtp.js";

const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/verify-otp", verifyOtp );
router.post("/forgot-password",forgotPassword);
router.post("/logout",logout);
router.post("/resend-otp",resend_otp);
router.post("/reset-password", resetPassword);
router.post("/verify-reset-otp",verify_reset_pass_otp);


export default router;
