const userService = require('../service/userService')

class AuthRegController {
    async registration(req,res) {
        try{
            const {username, email, password} = req.body.user;
            const userData = await userService.registration(email,password,username);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly:true})
            res.json(userData)
        } catch(e) {
            console.log(e)
            res.json('sd')
        }
      
    }
    async singIn(req,res) {
        try{
            const {email,password} = req.body.user;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly:true})
            res.json(userData)
        } catch(e) {
            res.json(e)
        }
    }

}

module.exports = new AuthRegController();