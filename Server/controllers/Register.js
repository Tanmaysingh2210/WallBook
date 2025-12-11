import express from 'express';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

// export const transporter = nodemailer.createTransport({
//     host : 'smtp.gmail.com',
//     port: 465,
//     secure:true,
//     auth:{
//         user:'wallbookservice@gmail.com',
//         pass: process.env.PASSKEY
//     },
// });


// const generateOtp = () => crypto.randomInt(100000, 999999).toString();

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !validateEmail(email)) return res.status(400).json({ message: "Enter a valid email" });

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "user already exist" });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        await User.create({
          name,
          email,
          password: hash,
        })
      })
    });

    // const mailData= {
    //   from:'wallbookservice@gmail.com',
    // to:email,
    // subject:'otp verfication',
    // text:`your otp is: ${otp} `
    // };
    // await new Promise((resolve , reject)=>{
    //     transporter.sendMail(mailData ,(err , info)=>{
    //         if(err){
    //             console.error(err);
    //             reject(err);
    //         }
    //             else{
    //                 resolve(info);
    //             } })});

    // res.status(200).json({message: "user registered. otp sent to email please verify"});
    res.status(200).json({ message: "Registered successfully" , success:true });


    // await transporter.sendMail({from:'Wallbookservice@gmail.com',
    //   to:email,
    //   subject:'otp verfication',
    //   text:`your otp is: ${otp} `
    // })
    // // console.log(pop);
    // res.status(200).json({message:"user registered. otp sent to email please verify"})



  } catch (err) {
    return res.status(500).json({ message: "Register failed", error: err.message });
  }
}
