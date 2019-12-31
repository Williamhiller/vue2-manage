var mongoose = require('mongoose')
var TacticSchema = require('../schemas/tactic')
var Tactic = mongoose.model('Tactic',TacticSchema)

module.exports = Tactic
