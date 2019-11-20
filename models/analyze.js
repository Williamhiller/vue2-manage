var mongoose = require('mongoose')
var AnalyzeSchema = require('../schemas/analyze')
var Analyze = mongoose.model('Analyze',AnalyzeSchema)

module.exports = Analyze
