const mongoose = require('mongoose');

const UserModelSchema = new mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Email is required']
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true
    }
});

module.exports = mongoose.model('users', UserModelSchema);
