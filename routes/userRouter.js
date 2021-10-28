const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const {body} = require('express-validator');




router.get('/',authMiddleware, userController.getUser);
router.put('/',authMiddleware,
    body('user.email').isEmail(),
    body('user.userName').isLength({min:3, max:30}),
     userController.updateUser
);


module.exports = router;