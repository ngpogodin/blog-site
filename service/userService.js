const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const tokenService = require('./tokenService');
const userModel = require('../models/userModel');
const UserDto = require('../dtos/userDto');


class UserService {
    async registration(email, password, userName) {
        const emailData = await userModel.findOne({email}),
        if(emailData) {
            throw new Error('User with this email already exists')
        }
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        const user = await userModel.create({email, hash, userName, salt});

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        
    }
}