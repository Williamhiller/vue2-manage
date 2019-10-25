var mongoose = require('mongoose')
var UserSchema = require('../schemas/id')
var Id = mongoose.model('Id',UserSchema)

module.exports = Id
