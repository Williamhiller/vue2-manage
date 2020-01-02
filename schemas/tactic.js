var mongoose = require('mongoose')

var TacticSchema = new mongoose.Schema({
    result: String,
    area: String,
    tactics: String,
    situation: String
});

module.exports = TacticSchema;
