const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoute = require('./routes/authRoute'); // Ensure this path is correct
const DocumentBaseRoute = require('./routes/documentBases');
const userRoutes = require('./routes/users');
app.use('/api', userRoutes);


const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions)); // Apply CORS middleware with options

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/document-bases', DocumentBaseRoute)


// MongoDB Atlas connection URI
const MONGODB_URI = 'mongodb+srv://jihedoueslati4:SMLBguZPkYAytq5E@filer-manager.vyfvfjv.mongodb.net/File-Manager';

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('Error connecting to MongoDB Atlas', err);
  process.exit(1); // Exit process on connection failure
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
