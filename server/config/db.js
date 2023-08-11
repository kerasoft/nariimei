import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const client = await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}


export default connectDB
