const Router = require('express');
const router = new Router();
const articleController = require('../controllers/articleController');
const authMiddleware = require('../middlewares/authMiddleware');



router.get('/', articleController.getAllArticles);
router.get('/feed',authMiddleware, articleController.getFeed);
router.get('/:slug', articleController.getArticleBySlug);
router.post('/',authMiddleware, articleController.createArticle);
router.put('/:slug',authMiddleware, articleController.updateArticle);
router.delete('/:slug',authMiddleware, articleController.deleteArticle);
router.post('/:slug/favorite',authMiddleware, articleController.addToFavorite);
router.delete('/:slug/favorite',authMiddleware, articleController.deleteFromFavorite);

//comments
router.get('/:slug/comments',authMiddleware, articleController.getComments)
router.post('/:slug/comments', authMiddleware,articleController.createComment);
router.delete('/:slug/comments/:id',authMiddleware, articleController.deleteComment);




module.exports = router