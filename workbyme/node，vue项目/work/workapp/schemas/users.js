var mongoose = require('mongoose')
mongoose.Promise = global.Promise;

module.exports = new mongoose.Schema({
    phone: String,
    username: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: true
    }
})