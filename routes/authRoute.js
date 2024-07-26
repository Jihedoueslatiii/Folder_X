const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password with SHA1
        const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Verify the password
        const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');
        if (user.password !== hashedPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
});



router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Implement password reset logic here (e.g., generate token, send email)
        const resetToken = generateResetToken(); // Replace with your token generation logic

        // Send email to user with password reset instructions
        const mailOptions = {
            from: 'jihedoueslati4@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n`
                + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
                + `http://localhost:3000/reset/${resetToken}\n\n`
                + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Password reset instructions sent to your email' });

    } catch (error) {
        console.error('Error sending password reset email:', error);
        res.status(500).json({ message: 'Error sending password reset email', error });
    }
});
// Get User Profile (Just Username)
router.get('/profile', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use environment variable for secret
        const user = await User.findById(decoded.id).select('username');

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ username: user.username });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Error fetching user profile' });
    }
});
// authController.js (or similar)
//router.get('/current', authenticateToken, async (req, res) => {
    //try {
        //const user = await User.findById(req.user.id).select('username'); // Adjust as needed
       // if (!user) {
        //    return res.status(404).json({ message: 'User not found' });
      //  }
   //     res.json({ username: user.username });
 //   } catch (error) {
      //  console.error('Error fetching user data:', error);
        //res.status(500).json({ message: 'Server error' });
   // }
//});


module.exports = router;
