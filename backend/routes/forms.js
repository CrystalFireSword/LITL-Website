import express from 'express'
import Form from '../models/forms.model.js'
import { verifyToken } from '../middleware/authMiddleware.js'
import {myBlog} from '../design_patterms/observer_pattern.js'

const router = express.Router()

// getting all posts
const uri = process.env.MONGODB_URI; 
router.post('/', verifyToken, async (req, res) =>{
    const newForm = new Form(req.body)    
    try{
        const savedItem = await newForm.save()
        res.status(200).json(savedItem)
    } catch (err){
        res.status(400).json({message:'Error while creating subscriber'+err})
    }
})
router.get('/', verifyToken, async (req, res) => {
    try {
        const formData = await Form.find({})
        res.json(formData);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving form data", error: error.message });
    }
});


// updating a given post
router.put('/:id', verifyToken, async(req, res)=>{
    try{
        const updatedItem = await Form.findbyIdandUpdate(req.params.id, req.body)
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
        await Form.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'Deleted successfully'})
    }
    catch (error){
        res.status(400).json({message:'Error while deleting form'+error})
    }
})

export default router