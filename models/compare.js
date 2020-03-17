var mongoose = require('mongoose')

var CompareSchema = new mongoose.Schema({
    result: String,
    ladbrokes: String,
    bet: String,
    william: String
});
var Compare = mongoose.model('Compare',CompareSchema)

module.exports = Compare
