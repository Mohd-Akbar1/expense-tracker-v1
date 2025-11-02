import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Income', 'Expense'],
        required: [ true, 'Transaction type is required' ]
    },
    amount: {
        type: Number,
        required: [ true, 'Transaction amount is required' ]
    },
    category: {
        type: String,
        required: [ true, 'Transaction category is required' ]  
    },
    date: {
        type: Date,
        required: [ true, 'Transaction date is required' ]
    },
    description: {
        type: String,
        required: [ true, 'Transaction description is required' ]

    }   ,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        },
        

}, { timestamps: true });

export const Transaction = mongoose.model('Transaction', transactionSchema, 'transactions');

