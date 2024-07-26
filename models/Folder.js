// models/Folder.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const folderSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    documents: [{
        type: Schema.Types.ObjectId,
        ref: 'Document',
    }],
    parentFolder: {
        type: Schema.Types.ObjectId,
        ref: 'Folder',
    },
    documentBase: {  // Reference to the document base
        type: Schema.Types.ObjectId,
        ref: 'DocumentBase',
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Folder', folderSchema);
