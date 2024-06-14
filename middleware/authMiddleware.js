const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log('Authorization Header:', authHeader); // Log the auth header

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('No Bearer token found or Authorization header is missing');
        return res.status(401).json({ message: 'Access denied' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token); // Log the token

    if (!token) {
        console.log('Token is undefined after split');
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach the verified token data to the request object
        console.log('Verified user:', verified); // Log the verified user for debugging
        next();
    } catch (err) {
        console.log('Token verification failed', err);
        res.status(400).json({ message: 'Invalid token' });
    }
};
