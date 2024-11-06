import express from 'express'
import Portfolio from '../models/portfolio.model.js'
import { verifyToken } from '../middleware/authMiddleware.js'
import {Filter, TypeFilter,HashtagFilter, LanguageFilter, PostFilterContext} from "../design_patterms/strategy_pattern.js"

const router = express.Router()

// creating a post
router.post('/', verifyToken, async (req, res)=>{
    const newItem = new Portfolio(req.body)
    try {
        const savedItem = await newItem.save()
        res.status(201).json(savedItem)
    } 
    catch (error){
        return res.status(400).json({messagee:'Error while adding post'+error.message})
    }
})

// getting all posts
const uri = process.env.MONGODB_URI; // Ensure this is set in your .env file

router.get('/', async (req, res) => {
    const { type, languages, hashtag } = req.query; // Retrieve query parameters
    const context = new PostFilterContext();

    // Map query parameters to their respective filter strategies
    const strategyMap = {
        type: TypeFilter.getInstance(),
        languages: LanguageFilter.getInstance(),
        hashtag: HashtagFilter.getInstance(),
    };

    // Loop over each parameter and set strategy if parameter exists
    Object.entries(strategyMap).forEach(([param, strategy]) => {
        if (req.query[param]) {
            context.setStrategy(strategy);
        }
    });

    try {
        const filteredPosts = await context.filter(type, languages, hashtag);
        res.json(filteredPosts);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving portfolio items", error: error.message });
    }
});





// updating a given post
router.put('/:id', verifyToken, async(req, res)=>{
    try{
        const updatedItem = await Portfolio.findbyIdandUpdate(req.params.id, req.body)
        res.status(200).json(updatedItem)
    }
    catch (error){
        res.status(500).json(error)
    }
})

// delete an item

router.delete('/:id', verifyToken, async(req, res)=>{
    try{
        console.log(req.params.id)
        await Portfolio.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'Deleted successfully'})
    }
    catch (error){
        res.status(400).json({message:'Error while deleting object'+error})
    }
})

export default router