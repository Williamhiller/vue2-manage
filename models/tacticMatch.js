var mongoose = require('mongoose')
var TacticMatchSchema = require('../schemas/tacticMatch')
var TacticMatch = mongoose.model('TacticMatch',TacticMatchSchema)

module.exports = TacticMatch
