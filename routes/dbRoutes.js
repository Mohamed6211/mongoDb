// Import required modules
const express = require('express');
const router = express.Router();
const { createDocument, getDocument, updateDocument, deleteDocument } = require('../models/db');

// Route to create a new document
router.post('/documents', async (req, res) => {
    try {
        const newDocument = await createDocument(req.body);
        res.status(201).json(newDocument);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a document by ID
router.get('/documents/:id', async (req, res) => {
    try {
        const document = await getDocument(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update a document by ID
router.put('/documents/:id', async (req, res) => {
    try {
        const updatedDocument = await updateDocument(req.params.id, req.body);
        res.status(200).json(updatedDocument);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a document by ID
router.delete('/documents/:id', async (req, res) => {
    try {
        await deleteDocument(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
