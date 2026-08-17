import User from '../models/register.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import  Admin from "../models/admin.js"
import Workspace from "../models/Workspace.js";
import JoinRequest from "../models/joinRequest.js";

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

export const employeeLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

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
        role: "employee",
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
      message: "Employee login successful"
      
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};


// WORKSPACE

export const getMyWorkspaceStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    const activeWorkspace = await Workspace.findOne({ employees: userId });

    if (activeWorkspace) {
      return res.status(200).json({
        isMember: true,
        requestStatus: "accepted",
        workspace: activeWorkspace,
      });
    }

    const pendingRequest = await JoinRequest.findOne({
      employeeId: userId,
      status: "pending",
    });

    if (pendingRequest) {
      return res.status(200).json({
        isMember: false,
        requestStatus: "pending",
        workspaceId: pendingRequest.workspaceId,
      });
    }

    return res.status(200).json({
      isMember: false,
      requestStatus: null,
      workspace: null,
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};


export const searchWorkspace = async (req, res) => {
  try {
    const { workspaceCode } = req.query;

    if (!workspaceCode) {
      return res.status(400).json({
        message: "Workspace code is required",
      });
    }

    const workspace = await Workspace.findOne({
      workspaceCode: workspaceCode.trim(),
    });

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }
 const existingRequest = await JoinRequest.findOne({
      employeeId: req.user.id,
      workspaceId: workspace._id,
    });

    return res.status(200).json({
      workspace,
      requestStatus: existingRequest
        ? existingRequest.status
        : null,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};


