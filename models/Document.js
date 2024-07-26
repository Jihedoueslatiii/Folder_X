const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: { type: String, required: true },
    file: { type: String }, // Field for file path
}, { timestamps: true });

module.exports = mongoose.model('Document', DocumentSchema);
