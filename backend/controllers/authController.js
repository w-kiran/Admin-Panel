import prisma from "../utils/db.js"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(404).json({
                message: "Something is missing",
                success: false
            })
        }

        const existinguser = await prisma.user.findUnique({
            where: { email }
        })

        if (existinguser) {
            return res.status(404).json({
                message: "Try different email",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const userCount = await prisma.user.count();
        const role = userCount === 0 ? 'SUPERADMIN' : 'USER';

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            }
        });

        return res.status(200).json({
            message: "Account created successfully",
            success: true
        })
    } catch (error) {
        console.error("Register Error:", error)
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(404).json({
                message: "Something is missing",
                success: false
            })
        }

        const existinguser = await prisma.user.findUnique({
            where: { email }
        })

        if (!existinguser) {
            return res.status(404).json({
                message: "User doesn't exist",
                success: false
            })
        }

        const comparePassword = await bcrypt.compare(password, existinguser.password)
        
        if(!comparePassword){
            return res.json({error:"Invalid Credentials"})
        }
        
        const payload = {
            id: existinguser.id,
            name: existinguser.name,
            email: existinguser.email,
            role: existinguser.role
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET)

        // return res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production",
        //     sameSite: 'none',
        //     maxAge: 24 * 60 * 60 * 1000 // 1 day
        // }).json({
        //     message: `${existinguser.name} Logged in successfully`,
        //     success: true,
        //     user:payload
        // })

        return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
            message: `${existinguser.name} Logged in successfully`,
            success: true,
            user:payload
        })
    } catch (error) {
        console.error("Login Error:", error)
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const logout = async (req, res) => {
    try {
        return res.cookie("token", "", { maxAge: 0 }).json({
            message: 'Logged out successfully.',
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

