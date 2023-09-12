import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'


dotenv.config()
const port = process.env.PORT

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res)=>{
    res.send('server at 5001')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log('listening at port', port)
})
