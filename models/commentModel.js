const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    id: {type: Number, require: true, unique: true},
    createdAt: Date,
    updatedAt: Date,
    body: {type: String, require: true, trim:true,},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})


module.exports = model('Comment', CommentSchema);