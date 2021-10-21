const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');




router.get('/', userController.getUser);
router.put('/', userController.updateUser);


module.exports = router;