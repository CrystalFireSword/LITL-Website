import mongoose from 'mongoose'

const formSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    phno : {
        type: String,
        required: true
    },
    email : {
        type:String,
        required : true
    },
    alemail : {
        type: String,
        required: true
    },
    type : [{
        type: String,
        required: true
    }],
    desig: {
        type: String,
        required: true
    },
    org: {
        type: String,
        required: true
    },
    handles: {
        type: String,
        required: true
    },
    help :{
        type: String,
        required: true
    },
    languages : [{
        type: String,
        required: true
    }],
    target : {
        type: String,
        required: true
    },
    samples : {
        type: String,
        required: true
    },
    link_to_work : {
        type: String,
        required: true
    },
    tone : {
        type: String,
        required: true
    },
    duedate : {
        type: Date,
        required: true
    },
    remarks :{
        type: String,
        required: true
    }
},{timestamps:true})

const Form = mongoose.model('Form', formSchema)
export default Form