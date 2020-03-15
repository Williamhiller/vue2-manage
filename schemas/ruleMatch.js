var mongoose = require('mongoose')

var RuleMatchSchema = new mongoose.Schema({
    ruleId: String,
    code: String,
    odd: String,
    score: String
});

module.exports = RuleMatchSchema;
