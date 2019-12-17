var mongoose = require('mongoose')
//聊天记录模型
var PositionSchema = new mongoose.Schema({
    match: String,
    position: String,
    kickback: String,
    area: String
});

module.exports = PositionSchema;
