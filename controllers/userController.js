const ApiError = require('../exceptions/api-error');
const userModel = require('../models/userModel');
const {validationResult} = require('express-validator');
const selectField = require('../utils/selectField');


class UserController {
    async getUser(req,res,next) {
        try{
            const userData = await userModel.findById(req.user.id);
            const token = req.headers.authorization.split(' ')[1];  
            
            await selectField.user(userData,token);
            res.json({user: userData});
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
            const query = await userModel.findByIdAndUpdate(req.user.id, updateDate, {new: true});
            const token = req.headers.authorization.split(' ')[1];
            const userData = selectField.user(query, token);
            
            res.json({user: userData});
        }catch(e) {
            next(e)
        }
    }
}

module.exports = new UserController()