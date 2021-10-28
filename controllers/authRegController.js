const userService = require('../service/userService');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

class AuthRegController {
    async registration(req,res,next) {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty() ) {
                throw ApiError.BadRequest('Invalid email or password', errors.array());
            }

            const {username, email, password} = req.body.user;
            const userData = await userService.registration(email,password,username);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly:true})
            
            res.json({user:userData})
        } catch(e) {
            next(e)
        }
      
    }
    async singIn(req,res,next) {
        try{
            const {email,password} = req.body.user;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly:true})
            res.json({user:userData})
        } catch(e) {
            next(e)
        }
    }

}

module.exports = new AuthRegController();