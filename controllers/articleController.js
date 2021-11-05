const ApiError = require('../exceptions/api-error');
const articleModel = require('../models/articleModel');
const userModel = require('../models/userModel');
const articleService = require('../service/articleService');
const slug = require('slug');


class ArticleController {

    async getAllArticles(req,res,next) {
        try{
            const {limit , offset} = {...req.query};
            if(req.query.favorited) {
                const user = await userModel.findOne({userName: req.query.favorited});
                if(!user) throw ApiError.NotFound('User not exist');

                const articles = await articleService.pagination({_id : {$in : [user.favorites]}},limit,offset);
                res.json({length:articles.length,articles})
                return
            }
            
            const filter = {};
            if(req.query.tag) {
                filter.tagList = req.query.tag
            }
            if(req.query.author) {
                const author = await userModel.findOne({userName: req.query.author});
                if(!author) throw ApiError.NotFound('User not exist');
                filter.author = author._id;
            }
    
    
            const articles = await articleService.pagination(filter,limit,offset);
    
            res.json({length:articles.length,articles});
        }
        catch(e) {
            next(e)
        }
    }


    async getFeed(req,res,next) {
        try{
            const {limit , offset} = {...req.query};
            const followers = await userModel.findById(req.user.id);

            const arrFollowers = followers.following.map(id => {
                return {author: id}
            })

            if(!arrFollowers.length) {
                res.json({articles: {}})
                next(e)
            }

            const articles = await articleService.pagination({$or : arrFollowers},limit,offset);

            res.json({articles});
        }catch(e) {
            next(e)
        }
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
            const updatedAt = new Date();
            const article =  await articleModel.findOneAndUpdate({slug:req.params.slug},{...data,updatedAt},{new:true});
            //handling errors for this define in articleModel
            res.json(article);
        }catch(e) {
            next(e);
        }
    }


    async deleteArticle(req,res,next) {
        try{
            const slug = req.params.slug;
            const article = await articleModel.findOneAndDelete({author:req.user.id,slug});
    
            if(!article) throw ApiError.NotFound('Article doesn`t exist');
    
            res.json({article});
        }catch(e) {
            next(e);
        }
    }


    async addToFavorite(req,res,next) {
        try{
            const slug = req.params.slug;
            const userId = req.user.id;

            const article = await articleModel.findOne({slug});
            if(!article) throw ApiError.NotFound('Article doesn`t exist');

            const user = await userModel.findByIdAndUpdate(userId, {$addToSet: { favorites: article._id }},{new:true})
            res.json({user});
        }catch(e) {
            next(e);
        }
    }


    async deleteFromFavorite(req,res,next) {
        try{
            const slug = req.params.slug;
            const userId = req.user.id;

            const article = await articleModel.findOne({slug});
            if(!article) throw ApiError.NotFound('Article doesn`t exist');

            const user = await userModel.findByIdAndUpdate(userId, { $pull: { favorites: article._id }},{new:true})
            res.json({user});
        }catch(e) {
            next(e);
        }
    }


    async createComment(req,res) {
        
    }


    async getComments(req,res) {

    }


    async deleteComment(req,res) {

    }
}

module.exports = new ArticleController();