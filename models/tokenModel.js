const mongoose = require('mongoose');


const TokenModel = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId , ref: 'User'},
    refreshToken: {type: String, required: true},
})

module.exports = model('Token', TokenSchema);