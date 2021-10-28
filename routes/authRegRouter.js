const Router = require('express');
const router = new Router();
const authRegController = require('../controllers/authRegController');
const {body} = require('express-validator');

router.post('/login',authRegController.singIn);
    
router.post('/',
    body('user.email').isEmail(),
    body('user.password').isLength({min:3, max: 30}),
    body('user.username').isLength({min:3, max: 15}),
    authRegController.registration
);


module.exports = router;