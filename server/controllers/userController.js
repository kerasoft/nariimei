import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js'
import generateToken from "../utils/generateToken.js";

//@desc     Auth user
//@route    POST /api/users/login
//@access   Public
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if(user && await user.matchPassword(password)) {
        generateToken(res, user._id)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            address: user.address,
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

//@desc     Register user
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler(async(req, res) => {
    const { email, name, password } = req.body
    let existingUser = await User.findOne({email})
    if(existingUser) {
        res.status(400)
        throw new Error('User already exists')
    } else {
        const user = await User.create({
            name,
            email,
            password
        })
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            address: user.address,
        })
    }
})

//@desc     Logout user / clear cookie
//@route    POST /api/users/logout
//@access   Private
const logoutUser = asyncHandler(async(req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: 'Logged out successfully'})
})

//@desc     Get user profile
//@route    GET /api/users/profile
//@access   Private
const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if(user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            address: user.address,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc     Update user profile
//@route    PUT /api/users/profile
//@access   Private
const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    if(user) {
        user.name = req.body.name || user.name
        // for password change
        if(req.body.newPassword) {
            if(await user.matchPassword(req.body.oldPassword)) {
                user.password = req.body.newPassword
            }else {
                res.status(401)
                throw new Error('Password entered is wrong')
            }
        }
        //for adding new address
        if(req.body.line1) {
            user.address = [...user.address, req.body]
        }

        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            address: updatedUser.address,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc     Get users
//@route    GET /api/users
//@access   Private / Admin
const getUsers = asyncHandler(async(req, res) => {
    res.send('Get Users')
})

//@desc     Get user by ID
//@route    GET /api/users/:id
//@access   Private / Admin
const getUserById = asyncHandler(async(req, res) => {
    res.send('Get User By Id')
})

//@desc     Delete user
//@route    DELETE /api/users/:id
//@access   Private / Admin
const deleteUser = asyncHandler(async(req, res) => {
    res.send('Delete User')
})

//@desc     Update user
//@route    PUT /api/users/:id
//@access   Private / Admin
const updateUser = asyncHandler(async(req, res) => {
    res.send('Update User')
})

export { 
    authUser, 
    registerUser, 
    logoutUser, 
    getUserProfile, 
    updateUserProfile, 
    getUsers, 
    getUserById,
    deleteUser,
    updateUser
}