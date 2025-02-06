import {Router} from "express"
// import { sample_users } from "../data";
import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import { User, UserModel } from "../models/user.model";
import bcrypt from "bcryptjs"
import { HTTP_BAD_REQUEST } from "../constants/http_status";

const router=Router()


// router.get("/seed" , asyncHandler(
//     async (req,res)=>{
//         const userCount=await UserModel.countDocuments()
//         if (userCount>0) {
//             res.send("already done")
//             return
//         }
//         await UserModel.create(sample_users)
//         res.send("done")
//     }
// ))

router.post("/login" , asyncHandler(
    async (req,res)=>{
        const {email,password}=req.body;  
        const user= await UserModel.findOne({email })
        
        if (user && (await bcrypt.compare(password, user.password))) {
            res.send(generateToken(user))
        }else{
            res.status(HTTP_BAD_REQUEST).send("email or password are invalid")
        }
    }
))  

router.post("/register" , asyncHandler(
    async (req,res)=>{
        const {name,email,password,address} = req.body;  
        const user= await UserModel.findOne({email})
        
        if (user) {
            res.status(HTTP_BAD_REQUEST).send("user is already exist !")
            return;
        }
        const encryptedPassword=await bcrypt.hash(password,10)
        const newUser:User ={
            id:'',
            name,
            email:email.toLowerCase(),
            password:encryptedPassword,
            address,
            isAdmin:false
        }
        const dbUser=await UserModel.create(newUser)
        res.send(generateToken(dbUser))
    }
))  


const generateToken=(user:any)=>{
    const token=jwt.sign({
        id:user.id, email:user.email , isAdmin:user.isAdmin
    },"secret",{
        expiresIn:"30d"
    })

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
      };
}
export default router