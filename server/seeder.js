import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { users } from './data/users.js'
import { products } from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'

dotenv.config()

connectDB()

async function importData () {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product=>{
            return {...product, user: adminUser}
        })
        await Product.insertMany(sampleProducts)
        console.log('Data Imported'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

async function destroyData () {
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        console.log("Data Destroyed".red.inverse)
        process.exit()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

if(process.argv[2] === '-d') destroyData()
else importData()