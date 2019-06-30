var mongoose = require('mongoose')
mongoose.Promise = global.Promise;

module.exports = new mongoose.Schema({
    username: String,
    password: String,
})