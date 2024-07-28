const User = require('../models/User');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Secret key for JWT (should be in environment variables for production)
const JWT_SECRET = 'your_jwt_secret_key';

// Login controller
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Hash the password with SHA1 (ensure this matches the hashing used on registration)
        const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

        // Find user by email and hashed password
        const user = await User.findOne({ email, password: hashedPassword });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create a token and send response
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expiration time
        );

        res.json({ token, message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
