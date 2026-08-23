import Admin from "../models/admin.js"
import Workspace from "../models/Workspace.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import crypto from "crypto";
import JoinRequest from "../models/joinRequest.js";
import User from "../models/register.js";
import Ticket from "../models/ticket.js";
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

export const adminLogout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
    });

    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Server error during logout",
    });
  }
};




export const getJoinRequests = async (req, res) => {
  try {
    console.log("Admin ID:", req.user.id);
    const workspace = await Workspace.findOne({
      adminId: req.user.id
    });

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found"
      });
    }

    const requests = await JoinRequest.find({
      workspaceId: workspace._id,
      status: "pending"
    });

    const result = [];

    for (const request of requests) {
      const employee = await User.findById(request.employeeId);

      if (employee) {
        result.push({
          requestId: request._id,
          employeeName: employee.userName,
          employeeEmail: employee.email,
          status: request.status
        });
      }
    }

    return res.status(200).json({
      requests: result
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};

export const acceptJoinRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await JoinRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        message: "Join request not found",
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        message: "Request has already been processed",
      });
    }

    const workspace = await Workspace.findOne({
      _id: request.workspaceId,
      adminId: req.user.id,
    });

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    workspace.employees.push(request.employeeId);

    await workspace.save();

    request.status = "accepted";

    await request.save();

    return res.status(200).json({
      message: "Join request accepted",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};


export const getEmployees = async (req, res) => {
  try {
    const workspace = await Workspace.findOne({
      adminId: req.user.id,
    });

    console.log("Workspace:", workspace);
    console.log("Employees IDs:", workspace?.employees);

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    const employees = await User.find({
      _id: { $in: workspace.employees },
    }).select("userName email");

    console.log("Found employees:", employees);

    return res.status(200).json({
      employees,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const rejectJoinRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await JoinRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        message: "Join request not found",
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        message: "Request has already been processed",
      });
    }

    const workspace = await Workspace.findOne({
      _id: request.workspaceId,
      adminId: req.user.id,
    });

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    request.status = "rejected";

    await request.save();

    return res.status(200).json({
      message: "Join request rejected",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};



//GET TICKET FOR WORKSPACE

export const getAdminTicketsController = async (req, res) => {
  try {
    const tickets = await Ticket.find({})
      .populate("user", "userName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tickets.length,
      data: tickets
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


//DELETE TICKET 

export const deleteTicketController = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    await Ticket.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Ticket deleted successfully",
    });

  } catch (error) {
    console.error("Delete Ticket Error:", error);

    return res.status(500).json({
      message: "Server error while deleting ticket",
    });
  }
};

//details ticket 

export const detailsTicketController = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findById(id)
      .populate("user", "userName email");

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: ticket
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};