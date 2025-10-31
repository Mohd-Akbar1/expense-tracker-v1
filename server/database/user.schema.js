import { profile } from "console";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'User name is required' ]
    },
    email: {
        type: String,
        required: [ true, 'User email is required' ],
        unique: true
    },
   profilePicture: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // reference to transactions
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
});

export const User = mongoose.model('User', userSchema, 'users');
