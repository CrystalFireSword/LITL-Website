import express from 'express'
import Subscriber from '../models/subscribers.model.js'
import {myBlog} from '../design_patterms/observer_pattern.js'
import { body, validationResult } from 'express-validator'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', [
    body('mailId')
        .trim()
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail()
], async (req, res) =>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }

        const existingSubscriber = await Subscriber.findOne({ mailId: req.body.mailId });
        if (existingSubscriber) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }

        const newSubscriber = new Subscriber(req.body)
        const savedItem = await newSubscriber.save()
        myBlog.subscribe(newSubscriber.mailId)
        res.status(200).json(savedItem)
    } catch (err){
        res.status(400).json({message:'Error while creating subscriber'})
    }
})

router.get('/', authMiddleware, async (req, res) =>{
    try{
        const subscribers = await Subscriber.find({})
        res.status(200).json(subscribers)
    }catch(err){
        res.status(400).json({message: 'Error while getting subscribers'})
    }
})

export default router