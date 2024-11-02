import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) =>{
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

export default authMiddleware