const mongoose = require('mongoose');
const db = 'mongodb://localhost/citymap';

//引入模型
const glob = require('glob');
const path = require('path');
exports.initSchemas = ()=>{
    glob.sync(path.resolve(__dirname, './model', '*.js')).forEach(require);
}

exports.connect = ()=>{
    //连接数据库
    mongoose.connect(db, {useNewUrlParser: true});
    //监听数据库连接
    mongoose.connection.on('disconnected', ()=>{
        mongoose.connect(db);
    })
    //数据库连接成功提示
    mongoose.connection.once('open', ()=>{
        console.log('MongoDB connect success!')
    })
}