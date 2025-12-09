import express from 'express';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { log } from 'console';
export const transporter = nodemailer.createTransport({
    host : 'smtp.gmail.com',
    port: 465,
    secure:true,
    auth:{
        user:'wallbookservice@gmail.com',
        pass: process.env.PASSKEY
    },
});


const generateOtp = () => crypto.randomInt(100000, 999999).toString();

export const Register = async(req,res) => {
  try {
    const {name,email,password}=req.body;
    let user=await User.findOne({email});
    if(user)return res.status(400).json({message:"user already exist"});
    const otp=generateOtp();
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

      const mailData= {
        from:'wallbookservice@gmail.com',
      to:email,
      subject:'otp verfication',
      text:`your otp is: ${otp} `
      };
      await new Promise((resolve , reject)=>{
          transporter.sendMail(mailData ,(err , info)=>{
              if(err){
                  console.error(err);
                  reject(err);
              }
                  else{
                      resolve(info);
                  } })});

      res.status(200).json({message: "user registered. otp sent to email please verify"});
      
          
    // await transporter.sendMail({from:'Wallbookservice@gmail.com',
    //   to:email,
    //   subject:'otp verfication',
    //   text:`your otp is: ${otp} `
    // })
    // // console.log(pop);
    // res.status(200).json({message:"user registered. otp sent to email please verify"})

    

  } catch (mailErr) {
  console.error("=== nodemailer sendMail error ===");
  console.error(mailErr);                // full object
  console.error("code:", mailErr.code);
  console.error("response:", mailErr.response);
  console.error("responseCode:", mailErr.responseCode);
  // Optionally delete created user if you don't want useless DB rows
  // await User.findByIdAndDelete(user._id);
  return res.status(500).json({ message: "Registered but OTP send failed", error: mailErr.message });
}
}
