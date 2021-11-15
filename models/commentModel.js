const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    createdAt: Date,
    body: {type: String, require: true, trim:true,},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})


module.exports = mongoose.model('Comment', CommentSchema);