const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentBaseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    folders: [{
        type: Schema.Types.ObjectId,
        ref: 'Folder',
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('DocumentBase', documentBaseSchema);
