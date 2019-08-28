var mongoose = require('mongoose')
mongoose.Promise = global.Promise;

module.exports = new mongoose.Schema({
    //内容id
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    title: String,
    description: {
        type: String,
        default: ''
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    addTime: {
        type: Date,
        default: new Date()
    },
    content: {
        type: String,
        default: "",
    },
    comments: {
        type: Array,
        default: []
    }


})