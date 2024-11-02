import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const authMiddleware = (req, res, next) =>{
    // get the token from the header
    const token = req.header('Authorization')?.split(' ')[1]
    if (!token){
        return res.status(400).json({message: 'Access denied as no token was provided'})
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // attach user to next object
        req.user = decoded
        console.log(req.user)
        next()
    } 
    catch (error){
        return res.status(400).json({message: 'Invalid token'})
    }
}

export const verifyToken = (req, res, next) =>{
    // get the token from the header
    const token = req.header('Authorization')?.split(' ')[1]
    if (!token){
        return res.status(400).json({message: 'Access denied as no token was provided'})
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // attach user to next object
        req.user = decoded
        console.log(req.user)
        const admin_id = process.env.ADMIN_ID
        if (req.user.userId!=admin_id){
            return res.status(400).json({message:'Access Denied'})
        }
        next()
    } 
    catch (error){
        return res.status(400).json({message: 'Invalid token'+error.message})
    }
}