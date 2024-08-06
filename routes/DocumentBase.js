const express = require('express');
const router = express.Router();
const DocumentBase = require('../models/DocumentBase');

// Create a new Document Base
router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const newDocumentBase = new DocumentBase({ name });
        await newDocumentBase.save();
        res.status(201).json(newDocumentBase);
    } catch (error) {
        res.status(500).json({ message: 'Error creating document base', error });
    }
});

// Fetch all Document Bases
router.get('/', async (req, res) => {
    try {
        const documentBases = await DocumentBase.find().populate('folders');
        res.status(200).json(documentBases);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching document bases', error });
    }
});

module.exports = router;
