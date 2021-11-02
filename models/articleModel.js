const mongoose = require('mongoose');
const slug = require('slug');
const ApiError = require('../exceptions/api-error');



const ArticleSchema = new mongoose.Schema({
    slug: { type: String, unique: true,},
    title: { type: String, require: true, maxLength: 100, trim: true},
    description: { type: String, maxLength: 500, trim: true },
    body: { type: String, require: true,  trim: true },
    tagList: [String],
    createdAt: Date,
    updatedAt: Date,
    favoritesCount: { type: Number, default: 0 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  }
)


ArticleSchema.pre('save',function(next) {
    this.slug = slug(this.title);
    next();
})

const handleE11000 = function(error, res, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(ApiError.BadRequest('There was a duplicate key error',error));
  } else {
    next();
  }
};

ArticleSchema.post('findOneAndUpdate', handleE11000)


// + middleware for findOneAndUpdate()

module.exports = mongoose.model('Article', ArticleSchema);