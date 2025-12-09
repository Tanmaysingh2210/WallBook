import express from 'express';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:'Wallbookservice@gmail.com',
        pass: process.env.pass
    }
});

const generateOtp = crypto.randomInt(100000,999999).toString();

export const Register = async(req,res) => {
  try {
    const {name,email,password}=req.body;
    let user=await User.findOne({email});
    if(user)return res.status(400).json({message:"user already exist"});
    const otp=generateOtp;
    const otpExpire=new Date(Date.now()+5*60*1000);

    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(password,salt,async(err,hash)=>{
        await User.create({
          name,
          email,
          password:hash,
          otp,
          otpExpire
        })
      })
    });

    await transporter.sendMail({from:'Wallbookservice@gmail.com',
      to:email,
      subject:'otp verfication',
      text:`your otp is: ${otp} `
    })
    res.status(200).json({message:"user registered. otp sent to email please verify"})

  } catch (err) {
      res.status(500).json({message:"Error registering user" , error:err.message});
  }
}
