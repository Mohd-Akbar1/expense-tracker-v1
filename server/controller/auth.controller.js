import jwt from "jsonwebtoken";
import {User} from "../database/user.schema.js";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export const googleLoginSuccess = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = generateToken(req.user);
  res.cookie("token", token, { httpOnly: true, secure: false });
  //  res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`)
   res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${token}`);


};

export const googleLoginFailure = (req, res) => {
  res.status(401).json({ message: "Google login failed" });
};

export const getUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized User" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-__v");
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
