const ApiError = require('../exceptions/api-error');
const articleModel = require('../models/articleModel');
const articleService = require('../service/articleService');
const slug = require('slug');


class ArticleController {

    async getAllArticles(req,res) {
        const {limit , offset} = {...req.query}
        
        const articles = await articleService.pagination(limit,offset)

        res.json({length:articles.length,articles})
    }


    async getArticlesByUser(req,res) {

    }


    async getArticleBySlug(req,res,next) {
        try{
            const slug = req.params.slug;
            const article = await articleModel.findOne({slug});

            if(!article) {
                throw ApiError.NotFound('Article not found',article);
            }

            res.json(article);
        }catch(e) {
            next(e)
        }

    }


    async createArticle(req,res,next) {
        try{
            const userData = req.user;
            const currentDate = new Date();
            const data = req.body.article;
            const article = await articleModel.create({...data, createdAt: currentDate, author: userData.id});
    
            res.json(article);
        }
        catch(e) {
            next(e);
        }

    }


    async updateArticle(req,res,next) {
        try{
            const data = req.body.article;
            if(data.title) {
                data.slug = slug(data.title);
            }
            const article =  await articleModel.findOneAndUpdate({slug:req.params.slug},{...data},{new:true});
            //handling errors for this define in articleModel
            res.json(article);
        }catch(e) {
            next(e);
        }
    }


    async deleteArticle(req,res) {

    }


    async addToFavorite(req,res) {

    }


    async deleteFromFavorite(req,res) {

    }


    async createComment(req,res) {
        
    }


    async getComments(req,res) {

    }


    async deleteComment(req,res) {

    }
}

module.exports = new ArticleController();