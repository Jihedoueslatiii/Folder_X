// routes/folders.js
const express = require('express');
const router = express.Router();
const Folder = require('../models/Folder');

// Create a new Folder
router.post('/', async (req, res) => {
    const { name, parentFolder, documentBase, createdBy } = req.body;
    try {
        const newFolder = new Folder({ name, parentFolder, documentBase, createdBy });
        await newFolder.save();
        res.status(201).json(newFolder);
    } catch (error) {
        res.status(500).json({ message: 'Error creating folder', error });
    }
});

// Fetch all Folders within a Document Base
router.get('/document-base/:documentBaseId', async (req, res) => {
    const { documentBaseId } = req.params;
    try {
        const folders = await Folder.find({ documentBase: documentBaseId });
        res.status(200).json(folders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching folders', error });
    }
});

// Fetch a single Folder by ID
router.get('/:id', async (req, res) => {
    try {
        const folder = await Folder.findById(req.params.id);
        if (!folder) {
            return res.status(404).json({ message: 'Folder not found' });
        }
        res.status(200).json(folder);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching folder', error });
    }
});

// Update a Folder
router.put('/:id', async (req, res) => {
    try {
        const { name } = req.body;
        const updatedFolder = await Folder.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        );
        res.status(200).json(updatedFolder);
    } catch (error) {
        res.status(500).json({ message: 'Error updating folder', error });
    }
});

// Delete a Folder
router.delete('/:id', async (req, res) => {
    try {
        await Folder.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Folder deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting folder', error });
    }
});

module.exports = router;
