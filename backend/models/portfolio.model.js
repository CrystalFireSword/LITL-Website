// backend/models/Portfolio.js
import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true },
    description: { 
        type: String, 
        required: true },
    type: { 
        type: String, 
        enum: ['Caption', 'Post', 'Design', 'Marketing','Other'], 
        required: true },
    language : [{
        type : String,
        enum : ['Tamil','Hindi','Sanskrit','English','Other'],
        required : true,
    }],
    link: { 
        type: String,
        required: true }, // For links to posts or designs
    image: { type: String,
     }, // For images of designs
   
    },
    {timestamps: true});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
export default Portfolio;
