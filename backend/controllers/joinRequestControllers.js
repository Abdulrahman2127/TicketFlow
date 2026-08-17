import JoinRequest from "../models/joinRequest.js"
import Workspace from "../models/Workspace.js";

export const requestToJoin = async (req, res) => {
  try {
    
    const { workspaceId } = req.body;

    if (!workspaceId) {
      return res.status(400).json({
        message: "Workspace ID is required",
      });
    }
    
    console.log("workspaceId:", workspaceId);

    const workspace = await Workspace.findById(workspaceId);
    console.log("workspaceId:", workspaceId);
    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }
    if (workspace.members?.includes(req.user.id) || workspace.ownerId?.toString() === req.user.id) {
    return res.status(400).json({
      message: "You are already a member of this workspace",
    });
  }
  
    const existingRequest = await JoinRequest.findOne({
      employeeId: req.user.id,
      workspaceId,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "You already have a pending request",
      });
    }

    const newRequest = new JoinRequest({
      employeeId: req.user.id,
      workspaceId,
    });

    await newRequest.save();

    return res.status(201).json({
      message: "Join request sent successfully",
      request: newRequest,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};