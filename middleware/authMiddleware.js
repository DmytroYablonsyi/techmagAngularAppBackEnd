import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';

// Middleware to protect routes by verifying the JWT token.

const protect = asyncHandler(async(req, res, next) => {
    
    let token = req.headers['authorization'];

    if (!token) return res.status(401).json({ message: 'No token provided' });

    token = token.split(' ')[1]; 

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' });
        req.user = decoded;
        next();
    });
}); 

export { protect }