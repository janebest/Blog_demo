var mongoose = require('mongoose')
var adminSchema = require('../schemas/admin')
models.Admin = mongoose.model('admin', admin);
module.exports = mongoose.model('Admin', adminSchema)
