import express from 'express'
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import authMiddleware from '../authMiddleware.js'

const router = express.Router()

// Registration Route

// yet to write code for getting and deleting all users
// similarly we can get all users using another get method to check for admit and then use find({})
router.get('/profile', authMiddleware, async (req,res)=>{
    const id = req.user.userId
    console.log(id)
    const data = await User.findOne({_id:id}).select('-password')
    res.json({message:'Welcome to your profile!', 
        user:(data)
})
})


router.post('/signup', async (req, res)=>{
    const {username, email, password} = req.body;

    try {
        // check if the user already exists
        const existingUser = await User.findOne({email: email})
        if (existingUser){
            return res.status(400).json({message: 'User already exists'})
        }
        
        // hashing the password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        console.log(salt, password)
        //hashing using salt
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log(hashedPassword)
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
        res.status(500).json({message: error.message})
    }
})


// Login route

router.put('/login', async(req, res)=>{
    const {email, password} = req.body

    try{
        const user = await User.findOne({email:email})
        if (!user){
            return res.status(400).json({message:'User not found'})
        }

        // compare passwords
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.status(400).json({message:'Invalid Credentials'})
        }
        
        // create a JWT token
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        res.json({token})
    } catch (error){
        res.status(500).json({message:'Server Error'+error.message, })
    }
})

export default router