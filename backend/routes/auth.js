import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

// Registration Route

router.post('/signup', async (req, res)=>{
    const {username, email, password} = req.body;

    try {
        // check if the user already exists
        const existingUser = await User.findOne({ email})
        if (existingUser){
            return res.status(400).json({message: 'User already exists'})
        }
        
        // hashing the password
        const hashedPassword = await bcrypt.hasg(password, 10)

        // create a new user

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save()
        res.status(201).json({message: 'User registered successfully!'})
    }
    catch(error){
        res.status(500).json({message: 'Server error'})
    }
})


// Login route

router.post('/login', async(req, res)=>{
    const {email, password} = req.body

    try{
        const user = await User.findOne({email})
        if (!user){
            return res.status(400).json({message:'User not found'})
        }

        // compare passwords
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.status(400).json({messahe:'Invalid Credentials'})
        }
        
        // create a JWT token
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        res.json({token})
    } catch (error){
        res.status(500).json({message:'Server Error'})
    }
})

export default router