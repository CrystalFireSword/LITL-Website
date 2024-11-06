import mongoose from 'mongoose'

const subscriberSchema = new mongoose.Schema({
    mailId:{
        type: String,
        required: true
    },},
    {timestamps:true}
)

const Subscriber = mongoose.model('Subscriber',subscriberSchema)

export default Subscriber