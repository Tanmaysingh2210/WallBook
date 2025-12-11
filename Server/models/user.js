import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // otp: { type: String },
    // otpExpire: { type: Date },
    // isVerified: { type: Boolean, default: false },

    // resetPasswordOtp: { type: String },
    // resetPasswordOtpExpire: { type: Date },

    isPremium: {
        type: Boolean,
        default: false
    },
    planType: {
        type: String,
        enum: ['basic', 'pro', 'enterprise'],
        default: null
    },
    subscriptionStartDate: {
        type: Date,
        default: null
    },
    subscriptionEndDate: {
        type: Date,
        default: null
    },
    lastPaymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        default: null,
    },
}, {
    timestamps: true
})

const user = mongoose.model('User', userSchema);
export default user;