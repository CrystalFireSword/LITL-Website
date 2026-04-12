import express from 'express'
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { body, validationResult } from 'express-validator'

const router = express.Router()

router.post('/signup', [
    body('username')
        .trim()
        .isLength({ min: 3, max: 30 }).withMessage('Username must be 3-30 characters')
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),
    body('email')
        .trim()
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
], async (req, res)=>{
    const {username, email, password} = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }

        const existingUser = await User.findOne({email: email})
        if (existingUser){
            return res.status(400).json({message: 'User already exists'})
        }
        
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save()
        res.status(201).json({message: 'User registered successfully!'})
    }
    catch(error){
        res.status(500).json({message: 'Registration failed'})
    }
})


// Login route

router.put('/login', [
    body('email')
        .trim()
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required')
], async (req, res) => {
    const { email, password } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Get role from user document in database
        const role = user.role || 'user';

        // Create a JWT token with user ID and role
        const token = jwt.sign({ userId: user._id, role: role }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000
        });

        res.json({ role });
    } catch (error) {
        res.status(500).json({ message: 'Login failed' });
    }
});
// similarly we can get all users using another get method to check for admit and then use find({})
// getting a given user's profile based on token
router.get('/profile', authMiddleware, async (req,res)=>{
    const id = req.user.userId
    const data = await User.findOne({_id:id}).select('-password')
    res.json({message:'Welcome to your profile!', 
        user:(data)
})
})

// updating a user's profile based on token and updated values
router.put('/profile', authMiddleware, async(req,res)=>{
    const {username,password} = req.body
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    
    //hashing using salt
    const hashedPassword = await bcrypt.hash(password, salt)
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,
            {username:username, password:hashedPassword},
            {new:true}
        )
        if (!updatedUser){
            return res.status(404).json({message: 'User not found'})
        }
        return res.status(200).json(updatedUser)
    } catch(error){
        return res.status(500).json({message: 'Error updating profile'})
    }
})

// deleting a user's account based on their token
router.delete('/profile', authMiddleware, async (req, res)=>{

    const id = req.user.userId
    try{
        const deleted = await User.findByIdAndDelete(id)
        if (!deleted){
            return res.status(400).json({message:'ID not found'})
        }
        return res.status(200).json({message:'Deleteed Successfully!'})

    } catch(error){
        return res.status(500).json({message:'Error while deleting'})
    }
})
export default router