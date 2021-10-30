const Router = require('express');
const router = new Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');



router.get('/:username',authMiddleware, profileController.getProfile);
router.post('/:username/follow',authMiddleware, profileController.followUser);
router.delete('/:username/follow',authMiddleware, profileController.unfollowUser);


module.exports = router