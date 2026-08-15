import mongoose from "mongoose";

const joinRequestSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
}, 
{ timestamps: true }
);

const JoinRequest = mongoose.model("JoinRequest", joinRequestSchema);

export default JoinRequest;