import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/adminUser.js";
import jwt from 'jsonwebtoken'

/**
 * @swagger
 * /api/adminUsers/login:
 *   post:
 *     summary: Auth user and get token
 *     description: Login with email and password, and return a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully authenticated and token received.
 *       401:
 *         description: Invalid email or password.
 */

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

/**
 * @swagger
 * /api/adminUsers:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully registered user.
 *       400:
 *         description: User already exists.
 *       500:
 *         description: Server error.
 */

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