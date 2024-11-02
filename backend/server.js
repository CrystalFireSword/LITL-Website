// import statements

import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

// load environment variables from the .env files
dotenv.config() 

// create the express app

const app = express()
const PORT = process.env.PORT || 5000

// introduce middleware to parse json file

app.use(express.json())

// mongodb connection

// Simple route to test if the server is running
app.get('/', (req, res) => {
    res.send("LITL SERVER IS RUNNING!")
})

// starting the server
app.listen(PORT, ()=> {
    console.log(`Server is running on http://localholt:${PORT}`)
})

