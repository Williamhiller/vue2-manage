var mongoose = require('mongoose')

var AccountSchema = new mongoose.Schema({
    account: String,
    money: Number,
    date: String
});

module.exports = AccountSchema;
