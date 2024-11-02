// import statements

import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoutes from './routes/auth.js'

// load environment variables from the .env files
dotenv.config()

// create the express app

const app = express()
const PORT = process.env.PORT || 5000

// introduce middleware to parse json file

app.use(express.json())

// mongodb connection

//console.log(process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
.then(()=> console.log('MongoDB connected successfully!'))
.catch(err => console.error('MongoDB connection error', err))

// Simple route to test if the server is running


app.get('/', (req, res) => {
    res.send("LITL SERVER IS RUNNING!")
})


// using the authentication routes
app.use('/api/auth', authRoutes)

// starting the server
app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
})

