const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const tokenService = require('./tokenService');
const userModel = require('../models/userModel');
const ApiError = require('../exceptions/api-error')


class UserService {
    async registration(email, password, userName) {
       
        const emailData = await userModel.findOne({$or: [{email}, {userName}]});
        if(emailData) {
            if(emailData.userName === userName) {
                throw  ApiError.BadRequest(`username is taken`);
            }
            if(emailData.email === email) {
                throw  ApiError.BadRequest(`email is taken`);
            }
        }
        
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        const user = await userModel.create({email, hash, userName, salt});
            
            
        const tokens = tokenService.generateTokens({email: user.email, userName: user.userName ,id : user._id});
        await tokenService.saveToken(user._id, tokens.refreshToken);
        return {user:user, accesToken: tokens.accessToken};
      
    }


    async login(email,password) {
        
        const user = await userModel.findOne({email});
        if(!user) {
            throw  ApiError.BadRequest(`${email} email not exist`);
        }

        const match = await bcrypt.compare(password, user.hash);
        if(!match) {
            throw  ApiError.BadRequest('Invalid password');
        }

        const tokens = tokenService.generateTokens({email, userName: user.userName,id: user._id});
        await tokenService.saveToken(user._id, tokens.refreshToken)
        return {user:user, accesToken: tokens.accessToken}

    }
}

module.exports = new UserService();