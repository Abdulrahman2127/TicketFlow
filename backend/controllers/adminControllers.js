import Admin from "../models/admin.js"
import Workspace from "../models/Workspace.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import crypto from "crypto";


const generateWorkspaceCode = () => {
  return crypto
    .randomBytes(4)
    .toString("hex")
    .toUpperCase();
};


export const createAdmin = async (req , res) => {
    try{
        const {userName , email , password , organization , ITWorkspace , workspaceCode } = req.body;

        const existingUser = await Admin.findOne({email})
        if(existingUser){
            return res.status(400).json({
            message: 'Email already exists',
        })
        }

        const hashedPassword = await bcrypt.hash(password , 10);
        const newAdmin = new Admin({
            userName , 
            email , 
            password : hashedPassword,
        })

         const newWorkspace = new Workspace({
            organization,
            ITWorkspace,
            workspaceCode: generateWorkspaceCode(),
            adminId: newAdmin._id,
        })
        await newAdmin.save();

        const checkWorkspace = await Workspace.findOne({organization})

        if(checkWorkspace){
            return res.status(400).json({
            message: 'organization already exists',
        })
        }
        
        await newWorkspace.save();
        res.json({message : "connect is successfuly!"})
    }catch(error){
        console.log(error)
    }
}


export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        message: "Email is not found!",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Incorrect password!",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: "admin",
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
      message: "it manager login successful"
      
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};


export const getWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findOne({
      adminId: req.user.id
    });

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found"
      });
    }

    return res.status(200).json({
      message: "IT manager dashboard successful",
      workspace
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};