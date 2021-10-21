const Router = require('express');
const router = new Router();
const articleRouter = require('./articleRouter');
const profileRouter = require('./profileRouter');
const userRouter = require('./userRouter');
const authRegRouter = require('./authRegRouter'); 


router.use('/articles', articleRouter);
router.use('/user', userRouter );
router.use('/users', authRegRouter );
router.use('/profiles', profileRouter);



module.exports = router