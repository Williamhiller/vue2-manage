var mongoose = require('mongoose')
var RuleMatchSchema = require('../schemas/ruleMatch')
var RuleMatch = mongoose.model('RuleMatch',RuleMatchSchema)

module.exports = RuleMatch
