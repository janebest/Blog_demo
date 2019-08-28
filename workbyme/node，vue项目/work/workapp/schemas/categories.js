var mongoose = require('mongoose')
mongoose.Promise = global.Promise;

module.exports = new mongoose.Schema({
    name: String,
    pic: String,

})