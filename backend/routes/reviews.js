import express from 'express';
import Review from '../models/reviews.model.js';
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router()

const uri = process.env.MONGODB_URI; 

//posting a review
router.post('/',verifyToken,async(req,res) => {
    const newReview = new Review(req.body);
    try{
        const savedItem = await newReview.save();
        res.status(200).json(savedItem)
    }catch(err){
        res.status(400).json({message:"Error while adding a review",error:error.message})
    }

})

router.get('/',async(req,res) => {
    try{
        const reviewData = await Review.find({})
        console.log(reviewData);
        res.json(reviewData);

    }catch(error){
        res.status(500).json({message:"Error retrieving data",error:error.message})
    }
})

export default router;