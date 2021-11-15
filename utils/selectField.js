class SelectField {

    async profile(obj) {
        
        const excludeWords = ['email','salt','hash','favorites', '_id', '__v'];
        excludeWords.forEach(el => {
            delete obj._doc[el];
        })
        return obj
    }

    user(obj, token) {
        const excludeWords = ['salt', 'hash', 'favorites', 'following', '_id', '__v']
        excludeWords.forEach(el => {
            delete obj._doc[el];
        })
        obj._doc.token = token
        return obj
    }

    articles(){}
}


module.exports = new SelectField();