const Router = require('express');
const router = new Router();
const profileController = require('../controllers/profileController');


router.get('/:username', profileController.getProfile);
router.post('/:username/follow', profileController.followUser);
router.delete('/:username/follow', profileController.unfollowUser);


module.exports = router