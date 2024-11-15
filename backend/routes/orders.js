import express from 'express'
import Form from '../models/forms.model.js'


const router = express.Router()

router.post("/submit",async(req,res)=>{
    const { name, phno, alemail, type, desig, org, handles, help, languages, target, samples, link_to_work, tone, duedate, remarks } = req.body;

  // Validate incoming data (simple example)
  if (!name || !phno || !alemail) {
    return res.status(400).json({ error: 'Name, phone number, and email are required' });
  }

  // Create a new document in the database
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
    duedate: new Date(duedate),
    remarks,
  });

  try {
    // Save to MongoDB
    await formData.save();
    return res.status(200).json({ message: 'Data successfully saved to MongoDB' });
  } catch (error) {
    console.error('Error saving data:', error);
    return res.status(500).json({ error: 'Failed to save data' });
  }
});


export default router;