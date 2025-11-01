import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/dbconnection.js';
import transactionRoutes from './route/transaction.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./config/passport.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
  connectDB();
app.use(cors())

app.use(express.json());

app.use(cookieParser());

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use('/api/auth', await import('./route/auth.route.js').then(mod => mod.default));
app.use('/api', transactionRoutes);

app.get('/', (req, res) => {
  res.send('api is running!');
});

app.listen(PORT, () => {
  
  console.log(`Server is running on port ${PORT}`);
});