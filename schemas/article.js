var mongoose = require('mongoose')


var ArticleSchema = new mongoose.Schema({
  id: Number,
  title: String,
    content: String
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
