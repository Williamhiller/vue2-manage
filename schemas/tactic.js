var mongoose = require('mongoose')

var TacticSchema = new mongoose.Schema({
    tactics: String,
    situation: String
});

module.exports = TacticSchema;
