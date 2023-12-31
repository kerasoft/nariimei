import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const addressSchema = new mongoose.Schema({
    line1: {
        type: String,
        required: true,
    },
    line2: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pin: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    address: [addressSchema],
})

userSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) {
        next()
    } else {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
})

const User = mongoose.model('User', userSchema)

export default User