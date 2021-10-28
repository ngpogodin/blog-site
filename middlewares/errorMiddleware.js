const ApiError = require('../exceptions/api-error')

module.exports = function(err, req, res, next) {
    console.log(err)
    if(err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    if(err.code === 11000) {
        return res.status(403).json({message: 'Email or username already exist'})
    }

    return res.status(500).json({message: 'unexpected error'})
}