const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    email: {type: String, require: true,unique: true, maxLength: 40},
    userName: {type: String, require: true, unique: true, maxLength: [30,'Must be less then 30 letters'], minLength:[3, 'Must be at least 3 letters']},
    bio: {type: String, trim: true, default: null},
    image: {type: String, default: null},
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
    salt: String,
    hash: String


  })


module.exports = mongoose.model('User', UserSchema);