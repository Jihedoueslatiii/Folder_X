// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'your_jwt_secret', async (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = await User.findById(user.id); // Attach user data to req
        next();
    });
};

module.exports = authenticateToken;
