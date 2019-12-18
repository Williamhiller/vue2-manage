var mongoose = require('mongoose')
var PositionSchema = require('../schemas/position')
var Position = mongoose.model('Position', PositionSchema)

module.exports = Position
