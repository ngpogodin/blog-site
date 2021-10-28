const mongoose = require('mongoose');
const ApiError = require('../exceptions/api-error');
const userModel = require('../models/userModel');
const {validationResult} = require('express-validator');


class UserController {
    async getUser(req,res,next) {
        try{
            const query = userModel.findById(req.user.id)
            const userData = await query.select('email token userName bio image -_id');
            userData._doc.token = req.headers.authorization.split(' ')[1];  
            
            res.json({user: userData})
        }catch(e) {
            next(e)
        }

    }

    async updateUser(req,res,next) {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                throw ApiError.BadRequest('Invalid email or username', errors.array());
            }


            const updateDate = req.body.user;
            const query = userModel.findByIdAndUpdate(req.user.id, updateDate, {new: true});
            const userData = await query.select('email token userName bio image -_id');
            userData._doc.token = req.headers.authorization.split(' ')[1];
            res.json({user: userData});
        }catch(e) {
            next(e)
        }
    }
}

module.exports = new UserController()