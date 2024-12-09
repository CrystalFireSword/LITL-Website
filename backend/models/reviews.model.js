import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        required : true,
    },
    review : {
        type : String,
        required : true
    }
});

const Review = mongoose.model('Review',reviewSchema);
export default Review;