var mongoose = require('mongoose')


var ArticleSchema = new mongoose.Schema({
    code: Number,
    match: String,
    round : String,
    homeName : String,
    guestName : String,
    homeScore : String,
    guestScore : String,
    first : String,
    odd : Object,
    asian : String,
    analyse: String,
    output: String
});

ArticleSchema.statics = {
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

module.exports = ArticleSchema
