import User from "../models/user";

export default verifyOtp = async (req, res) => {
    try {
        const {email,otp}=req.body;
        let user= await User.findOne({email});

        if(!user) return res.status(404).json({message:"user not found"});

        if(user.isVerified==true)return res.status(200).json({message:"user already verified"});

        if(String(user.otp)!=String(otp) || user.otpExpire<new Date()) return res.status(400).json({message:"invalid or expired Otp"});

        user.isVerified=true;
        user.otp=undefined;
        user.otpExpire=undefined;

        await user.save();

        req.session.regenerate(err=>{
            if(err){
                console.error("session regenerate error" , err);
                return res.status(500).json({message:"session starting error"});
            }

            req.session.user={id:user._id,email:user.email , name:user.name};
            console.log("new session created :",req.session.user);
            return res.status(200).json({message:"otp verified succesfully", user:req.session.user});

        });

    } catch (err) {
        console.error("error in verification" ,  err);
        return res.status(500).json({message:"error in verification ", error: err.message});
    }
}