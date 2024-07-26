const express = require('express');
const router = express.Router();
const DocumentBase = require('../models/DocumentBase');

// Create a new Document Base
router.post('/', async (req, res) => {
    const { name, createdBy } = req.body;
    try {
        const newDocumentBase = new DocumentBase({ name, createdBy });
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

// Fetch a single Document Base by ID
router.get('/:id', async (req, res) => {
    try {
        const documentBase = await DocumentBase.findById(req.params.id).populate('folders');
        if (!documentBase) {
            return res.status(404).json({ message: 'Document base not found' });
        }
        res.status(200).json(documentBase);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching document base', error });
    }
});

// Update a Document Base
router.put('/:id', async (req, res) => {
    try {
        const { name } = req.body;
        const updatedDocumentBase = await DocumentBase.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        );
        res.status(200).json(updatedDocumentBase);
    } catch (error) {
        res.status(500).json({ message: 'Error updating document base', error });
    }
});

// Delete a Document Base
router.delete('/:id', async (req, res) => {
    try {
        await DocumentBase.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Document base deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting document base', error });
    }
});

module.exports = router;
