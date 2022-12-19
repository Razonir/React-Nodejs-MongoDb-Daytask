const mongoose = require('mongoose');

const HistoryTaskModelSchema = new mongoose.Schema({
    name: {
        type: String
    },
    content:{
        type: String
    },
    status: {
        type: String
    },
    date:{
        type: String
    },
    userid: {
        type: String
    },
    taskid: {
        type: String
    }
});

module.exports = mongoose.model('historytasks', HistoryTaskModelSchema);
