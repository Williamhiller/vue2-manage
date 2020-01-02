var mongoose = require('mongoose')

var TacticMatchSchema = new mongoose.Schema({
    tacticId: String,
    code: String,
    match: String,
    odd: String,
    score: String
});

module.exports = TacticMatchSchema;
