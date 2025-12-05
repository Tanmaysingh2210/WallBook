import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";

export const login=async(req,res)=>{
    try {
        const{email,password}=req.body;
        const user = await User.findOne({email});
        if(!user)return res.status(400).json({message:"user not registered"});
        if(!user.isVerified)return res.status(400).json({message:"Email not verified , please verify"});

        const match = await bcrypt.compare(password,user.password);
        if(!match) return res.status(400).json({message:"Email or password is incorrect"});

        req.session.regenerate(err=>{
                if(err){
                    console.error("session error:" , err);
                    return res.status(500).json({message:"error starting session"});

                }
                req.session.user={id:user._id,email:user.email , name : user.name};
                console.log("session",req.session);
                res.json({message:"logged in successfully"});
        })
    }
    catch(err){
        res.status(500).json({message:"error logging in ",error:err.message });
    }

    
}