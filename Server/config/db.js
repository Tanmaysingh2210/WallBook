import mongoose from "mongoose";
import User from "../models/user.js";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.ATLAS_URI);
        console.log("MongoDB connected sucessfully");  

        await User.createCollection();
        console.log("User created sucessfully");

    } catch (err) {
        console.error({message: "Error connecting MongoDB" , error : err.message});
    }
}

export default connectDB;