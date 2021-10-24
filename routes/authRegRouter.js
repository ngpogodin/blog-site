const Router = require('express');
const router = new Router();
const authRegController = require('../controllers/authRegController')

router.post('/login', authRegController.singIn);
router.post('/', authRegController.registration);


module.exports = router;