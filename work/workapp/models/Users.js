var mongoose = require('mongoose')
var usersSchema = require('../schemas/nowusers')

module.exports = mongoose.model('Users', usersSchema)
