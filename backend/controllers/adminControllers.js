import Admin from "../models/admin.js"
import Workspace from "../models/Workspace.js"
import bcrypt from "bcrypt"

export const createAdmin = async (req , res) => {
    try{
        const {userName , email , password , organization , ITWorkspace } = req.body;

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
