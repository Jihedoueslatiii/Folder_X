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
}, { timestamps: true });

module.exports = mongoose.model('DocumentBase', documentBaseSchema);
