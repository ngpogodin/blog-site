const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    email: {type: String, require: true,unique: true, maxLength: 40},
    userName: {type: String, require: true, unique: true, maxLength: 30, minLength:3},
    bio: {type: String, trim: true},
    image: String,
    salt: String,
    hash: String

  })


module.exports = mongoose.model('User', UserSchema);