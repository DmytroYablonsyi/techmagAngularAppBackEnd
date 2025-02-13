import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/adminUser.js";
import jwt from 'jsonwebtoken'

// auth user and get token
//  POST /api/adminUsers/login

const authUser = asyncHandler (async (req, res) => { 
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    
    if(user && (await user.matchPassword(password))) {
        const token = jwt.sign(
            { userId: user._id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );
        res.json({ token });
    } else{
        res.status(401);
        throw new Error('Invalid email or password')
    }
});

// @desc register user 
// POST /api/amdinUsers

const registerUser = asyncHandler (async (req, res) => { 
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists')
    }
    try {
        const user = await User.create({ name, email, password });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
   
});

export { authUser, registerUser }