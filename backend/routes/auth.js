import express from 'express'
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

// Registration Route

// yet to write code for getting all users

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

router.put('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch, password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Determine role based on email
        const role = email === 'testuser1@gmail.com' ? 'admin' : 'user';

        // Create a JWT token with user ID and role
        const token = jwt.sign({ userId: user._id, role: role }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({ token, role });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});
// similarly we can get all users using another get method to check for admit and then use find({})
// getting a given user's profile based on token
router.get('/profile', authMiddleware, async (req,res)=>{
    const id = req.user.userId
    console.log(id)
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
        return res.status(500).json({message: 'Error updating profile'+error.message})
    }
})

// deleting a user's account based on their token
router.delete('/profile', authMiddleware, async (req, res)=>{

    const id = req.user.userId
    try{
        const deleted = User.findByIdAndDelete(id)
        if (!deleted){
            return res.status(400).json({message:'ID not found'})
        }
        return res.status(200).json({message:'Deleteed Successfully!'})

    } catch(error){
        return res.status(400).json({message:'Error while deleting'+error.message})
    }
})
export default router