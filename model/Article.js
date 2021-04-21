const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    articleId: Schema.Types.ObjectId,
    userName: String,
    userImg: String,
    text: String,
    imgs: [],
    createDate: {type: Date, default: Date.now()},
    address: String,
    cityId: String,
})

mongoose.model('Article', articleSchema);