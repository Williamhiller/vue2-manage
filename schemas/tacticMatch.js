var mongoose = require('mongoose')

var TacticMatchSchema = new mongoose.Schema({
    tacticId: String,
    code: String,
    match: String,
    odd: String,
    result: String
});

module.exports = TacticMatchSchema;
