import User from "../models/register.js"
import bcrypt from "bcrypt"

export const register  = async (req , res) => {
    try{
        const {userName , email , password} = req.body;
        const existingUser = await User.findOne({email})
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

        await newUser.save();

        res.json({message : "connect is successfuly!" , newUser})
    }catch(error){
        console.log(error)
    }
}

export const postLogin = async (req , res) => {
    try{
        const {password , email} = req.body;
        const user = await User.findOne({ email})

        if (!user) {
      return res.status(400).json({
        message: 'Email is note found!',
      })
    }

    const isPasswordCorrect = await bcrypt.compare(password , user.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message: "Inccorrect password!"})
    }

    return res.status(200).json({
      message: 'Login successful',
    })

    } catch(error){
        console.log(error)
    }
}