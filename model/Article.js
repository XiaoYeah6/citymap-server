const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    articleId: Schema.Types.ObjectId,
    userName: String,
    userImg: String,
    text: String,
    imgsDate: Object,
    createDate: {type: Date, default: Date.now()},
    address: String,
    regionId: String,
    imgs: [],
    marker: [],
})

mongoose.model('Article', articleSchema);