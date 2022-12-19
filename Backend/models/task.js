const mongoose = require('mongoose');

const TaskModelSchema = new mongoose.Schema({
    name: {
        type: String
    },
    content:{
        type: String
    },
    status: {
        type: String,
        enum : ['success','not'],
        default: 'not',
    },
    userid: {
        type: String
    }
});

module.exports = mongoose.model('tasks', TaskModelSchema);
