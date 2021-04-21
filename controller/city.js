const Koa = require('koa');
const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');
const fs = require('fs');

router.get('/insertCity', async (ctx)=>{
    fs.readFile('./data/citys.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        let count = 0;
        const City = mongoose.model('City');
        data.map((value, index) => {
            let city = new City(value);
            city.save().then(()=>{
                count++;
                console.log('成功' + count);
            }).catch(err=>{
                console.log('失败' + err);
            })
        });
    });
    ctx.body = '导入数据';
})

module.exports = router;