import express from 'express'
import Portfolio from '../models/portfolio.model.js'
import { verifyToken } from '../middleware/authMiddleware.js'
import {Filter, TypeFilter,HashtagFilter, LanguageFilter, PostFilterContext} from "../design_patterms/strategy_pattern.js"
import {myBlog} from '../design_patterms/observer_pattern.js'
import { ColorSchemeScript } from '@mantine/core'

const router = express.Router()

// creating a post
router.post('/', verifyToken, async (req, res)=>{
    const newItem = new Portfolio(req.body)
    
    try {
        const savedItem = await newItem.save()
        myBlog.addPost(savedItem)
        res.status(201).json(savedItem)
    } 
    catch (error){
        return res.status(400).json({messagee:'Error while adding post'})
    }
})

// getting all posts
const uri = process.env.MONGODB_URI; // Ensure this is set in your .env file


router.get('/', async (req, res) => {
    const { type, languages, hashtag } = req.query; // Retrieve query parameters
    const context = new PostFilterContext();

    // Initialize the query object for filtering
    let query = {};

    // If no filters are provided, return all posts
    if (!type && !languages && !hashtag) {
        try {
            const allPosts = await Portfolio.find(); // Fetch all posts
            return res.json(allPosts);
        } catch (error) {
            return res.status(500).json({ message: "Error retrieving all portfolio items" });
        }
    }

    // Map query parameters to their respective filter strategies
    const strategyMap = {
        type: TypeFilter.getInstance(),
        languages: LanguageFilter.getInstance(),
        hashtag: HashtagFilter.getInstance(),
    };

    // Use Object.entries to iterate over each parameter and set strategy if parameter exists
    Object.entries(strategyMap).forEach(([param, strategy]) => {
        if (req.query[param]) {
            context.setStrategy(strategy); // Set the appropriate strategy for the parameter

            // Add to query object based on the specific filter parameter
            switch (param) {
                case 'type':
                    query.type = { $in: type.split(',').map(t => t.trim()) }; // Handle multiple types
                    break;
                case 'languages':
                    const languagesArray = languages.split(',').map(lang => lang.trim()); // Split languages
                    query.language = { $all: languagesArray }; // Use $all to match all selected languages
                    break;
                case 'hashtag':
                    query.tags = { $in: hashtag.split(',').map(tag => tag.trim()) }; // Use $in to match hashtags
                    break;
                default:
                    break;
            }
        }
    });

    try {
        // Perform filtering based on the query object with all accumulated filters
        const filteredPosts = await Portfolio.find(query); // Query using all filters
        return res.json(filteredPosts);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving filtered portfolio items" });
    }
});


router.put('/:id', verifyToken, async(req, res)=>{
    try{
        const updatedItem = await Portfolio.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(updatedItem)
    }
    catch (error){
        res.status(500).json({ message: "Error updating item" })
    }
})

router.delete('/:id', verifyToken, async(req, res)=>{
    try{
        await Portfolio.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'Deleted successfully'})
    }
    catch (error){
        return res.status(500).json({message:'Error while deleting item'})
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