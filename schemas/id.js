var mongoose = require('mongoose')


var IdSchema = new mongoose.Schema({
  id: Number,
  name: {
    unique: true,
    type: String
  }
});

IdSchema.statics = {
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

module.exports = IdSchema
