const userModel = require('../models/userModel');
const ApiError = require('../exceptions/api-error');
const userService = require('../service/userService');
const selectField = require('../utils/selectField');

class ProfileController {
    async getProfile(req,res,next) {
        try{
            const userName = req.params['username'];
            const userData = await userModel.findOne({userName});
            
            if(!userData) {
                throw ApiError.NotFound('User not found',userData);
            }
            
            await selectField.profile(userData);
            res.json({profile: userData})
        }catch(e) {
            next(e)
        }
    }

    async followUser(req,res,next) {
        try{
            const userName = req.params['username'];
            const checkUser = await userModel.findOne({userName});
    
            if(!checkUser) {
                throw ApiError.NotFound('User not found',checkUser);
            }
    
            const currentUserId = req.user.id;
            const currentUser = await userModel.findByIdAndUpdate(currentUserId, 
                    { "$addToSet": { "following": checkUser._id }},
                    {new:true}
            );
    
            
            await selectField.profile(currentUser);
            res.json({profile: currentUser});

        }catch(e) {
            next(e)
        }
    }
    async unfollowUser(req,res,next) {
        try{
            const userName = req.params['username'];
            const checkUser = await userModel.findOne({userName});
    
            if(!checkUser) {
                throw ApiError.NotFound('User not found',checkUser);
            }
    
            const currentUserId = req.user.id;
            const currentUser = await userModel.findByIdAndUpdate(currentUserId, 
                    { "$pull": { "following": checkUser._id }},
                    {new:true}
            );
    
            await selectField.profile(currentUser);
            res.json({profile: currentUser});

        }catch(e) {
            next(e)
        }

    }
}

module.exports = new ProfileController();