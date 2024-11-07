import express from 'express'
import Subscriber from '../models/subscribers.model.js'
import {myBlog} from '../design_patterms/observer_pattern.js'

const router = express.Router()

// to write get method to get all subscribers and post method to add subscribers
// when a post is posted under portfolio actions, send a notification to all subscribers

router.post('/', async (req, res) =>{
    const newSubscriber = new Subscriber(req.body)    
    try{
        const savedItem = await newSubscriber.save()
        myBlog.subscribe(newSubscriber.mailId)
        res.status(200).json(savedItem)
    } catch (err){
        res.status(400).json({message:'Error while creating subscriber'+err})
    }
})

router.get('/', async (req, res) =>{
    try{
        const subscribers = await Subscriber.find({})
        res.status(200).json(subscribers)
    }catch(err){
        res.status(400).json({message: 'Error while getting subscribers'+err})
    }
})


export default router