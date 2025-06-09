import jwt from "jsonwebtoken"

const isAuth = async (req,res,next)=>{
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                message:"User not authenticated",
                success: false
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    }catch(error){
       console.error("Auth Middleware Error:", error);
        return res.status(401).json({
            message: "Unauthorized: Invalid token",
            success: false
        }); 
    }
}

export default isAuth