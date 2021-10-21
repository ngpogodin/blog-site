const Router = require('express');
const router = new Router();
const articleController = require('../controllers/articleController');



router.get('/', articleController.getAllArticles);
router.get('/feed', articleController.getArticlesByUser);
router.get('/:slug', articleController.getArticleBySlug);
router.post('/', articleController.createArticle);
router.put('/:slug', articleController.updateArticle);
router.delete('/:slug', articleController.deleteArticle);
router.post('/:slug/favorite', articleController.addToFavorite);
router.delete('/:slug/favorite', articleController.deleteFromFavorite);

//comments
router.get('/:slug/comments', articleController.getComments)
router.post('/:slug/comments', articleController.createComment);
router.delete('/:slug/comments/:id', articleController.deleteComment);




module.exports = router