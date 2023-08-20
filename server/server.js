import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
// import cors from 'cors'
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'


dotenv.config()
const port = process.env.PORT

const app = express()

connectDB()

// app.use(cors())

app.get('/', (req, res)=>{
    res.send('server at 3000')
})

app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log('listening at port', port)
})
