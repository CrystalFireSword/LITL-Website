import express from 'express'
import Form from '../models/forms.model.js'
import { body, validationResult } from 'express-validator'


const router = express.Router()

router.post("/submit", [
    body('name')
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
    body('phno')
        .trim()
        .matches(/^\+?[1-9]\d{6,14}$/).withMessage('Invalid phone number format'),
    body('alemail')
        .trim()
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail(),
    body('link_to_work')
        .optional()
        .isURL().withMessage('Invalid URL format'),
    body('duedate')
        .optional()
        .isISO8601().withMessage('Invalid date format')
], async(req,res)=>{
    const { name, phno, alemail, type, desig, org, handles, help, languages, target, samples, link_to_work, tone, duedate, remarks } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }

        if (!name || !phno || !alemail) {
            return res.status(400).json({ error: 'Name, phone number, and email are required' });
        }

        const formData = new Form({
            name,
            phno,
            alemail,
            type,
            desig,
            org,
            handles,
            help,
            languages,
            target,
            samples,
            link_to_work,
            tone,
            duedate: duedate ? new Date(duedate) : undefined,
            remarks,
        });

        await formData.save();
        return res.status(200).json({ message: 'Data successfully saved to MongoDB' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to save data' });
    }
});


export default router;