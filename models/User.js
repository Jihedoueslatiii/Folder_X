const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: [String],
        enum: ['user', 'admin', 'manager'],
        default: ['user'],
    },
    permissions: [{
        action: {
            type: String,
            enum: ['view', 'create', 'edit', 'delete', 'publish', 'admin'],
            required: true,
        },
        level: {
            type: String,
            enum: ['base', 'folder', 'document'],
            required: true,
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
