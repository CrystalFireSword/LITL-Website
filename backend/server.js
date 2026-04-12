import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoutes from './routes/auth.js'
import portfolioRoutes from './routes/portfolio.js'
import subscriberRouter from './routes/subscriber.js'
import ordersRouter from './routes/orders.js'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

dotenv.config({path:'../.env'});

const app = express()
const PORT = process.env.PORT || 5000

app.use(helmet())
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : "http://localhost:5001",
    credentials: true
}))
app.use(express.json({ limit: '10kb' }))

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { message: 'Too many attempts, please try again later' }
})

mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log('MongoDB connected successfully!'))
.catch(err => console.error('MongoDB connection error', err))

app.get('/', (req, res) => {
    res.send("LITL SERVER IS RUNNING!")
})

app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/portfolio', portfolioRoutes)
//app.use('/api/forms', formRouter)
app.use('/api/orders',ordersRouter)
app.use('/api/subscriber', subscriberRouter)

// starting the server
app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
})

