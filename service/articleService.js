const articleModel = require('../models/articleModel');

class ArticleServise {
    async pagination(filter,limit = 20,offset = 1) {
        if(limit < 0 || offset < 0) {
            limit = 20;
            offset = 1;
        }
       return articleModel.
                        find(filter).
                        sort('-createdAt').
                        skip((+limit) * (offset - 1)).
                        limit(+limit).
                        select('-_id -__v').
                        populate({path: 'author', select: 'userName bio image -_id'});
    }
}

module.exports = new ArticleServise();