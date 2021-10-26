const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const tokenService = require('./tokenService');
const userModel = require('../models/userModel');
const UserDto = require('../dtos/userDto');


class UserService {
    async registration(email, password, userName) {
        try{
            const emailData = await userModel.findOne({email});
            if(emailData) {
                throw new Error('User with this email already exists')
            }
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(password, salt);
            const user = await userModel.create({email, hash, userName, salt});
            
            
            const tokens = tokenService.generateTokens({email: user.email, userName: user.userName ,id : user._id});
            await tokenService.saveToken(user._id, tokens.refreshToken);
            return {user:user}
        } catch(e) {
            console.log(e)
            return
        }

    }


    async login(email,password) {
        try{
            const user = await userModel.findOne({email});
            if(!user) {
                throw new Error('This email not exist');
            }

            const match = await bcrypt.compare(password, user.hash);
            if(!match) {
                throw new Error('Invalid password');
            }

            const tokens = tokenService.generateTokens({email, userName: user.userName,id: user._id});
            await tokenService.saveToken(user._id, tokens.refreshToken)
            return {user:user}

        }catch(e) {
           throw new Error({error: e})
        }
    }
}

module.exports = new UserService();