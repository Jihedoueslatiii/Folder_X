const express = require('express');
const multer = require('multer');
const path = require('path');
const Document = require('../models/Document'); 
const router = express.Router();

// Configure multer
const storage = multer.diskStorage({
    destination: function (_req, file, cb) {
        cb(null, 'uploads/'); // Adjust the directory as needed
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Create a new Document with file upload
router.post('/', upload.single('file'), async (req, res) => {
    const { name, content, createdBy } = req.body;
    try {
        const newDocument = new Document({
            name,
            content,
            createdBy,
            file: req.file ? req.file.path : null // Save file path
        });
        await newDocument.save();
        res.status(201).json(newDocument);
    } catch (error) {
        res.status(500).json({ message: 'Error creating document', error });
    }
});

module.exports = router;
