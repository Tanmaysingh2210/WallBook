import express from 'express';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../models/user.js';

const Transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:'kisansathiservice@gmail.com',
        pass:'zufwxczkbrmmxcpi'
    }
});

const generateOtp = crypto.randomInt(100000,999999).toString();

export default Register = () => {
  try {
    
  } catch (err) {
    
  }
}
