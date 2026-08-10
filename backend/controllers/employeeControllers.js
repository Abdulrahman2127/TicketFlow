import User from '../models/register.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import  Admin from "../models/admin.js"
export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        message: 'Email already exists',
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    res.json({ message: 'connect is successfuly!', newUser })
  } catch (error) {
    console.log(error)
  }
}

export const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Admin.findOne({ email });
    let role = "admin";

    if (!user) {
      user = await User.findOne({ email });
      role = "employee";
    }

    if (!user) {
      return res.status(400).json({
        message: "Email is not found!",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Incorrect password!",
      });
    }
    
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      role,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
