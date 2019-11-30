let mongoose = require('mongoose')

let PushSchema = new mongoose.Schema({
    time: String,
    type: String,
    text: String,
    week: String,
    date: String
});
PushSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}
module.exports = PushSchema
