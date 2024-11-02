import express from 'express'
import Portfolio from '../models/portfolio.model.js'
import { verifyToken } from '../middleware/authMiddleware.js'

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
router.get('/', async(req, res) => {
    try{
        const items = await Portfolio.find({})
        res.status(200).json(items)
    } 
    catch (err){
        res.status(500).json({message:'Error while getting posts'+err})
     
    }
})

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