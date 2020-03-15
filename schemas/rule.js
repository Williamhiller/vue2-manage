var mongoose = require('mongoose')

var RuleSchema = new mongoose.Schema({
    match: String,
    result: String,
    area: String,
    description: String,
    situation: String
});

module.exports = RuleSchema;
