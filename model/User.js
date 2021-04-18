const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    userId: Schema.Types.ObjectId,
    userName: {unique: true, type: String},
    userImg: String,
    passWord: String,
    createDate: {type: Date, default: Date.now()}
})

userSchema.pre('save', function(next){
    bcrypt.genSalt(10, (err, salt)=>{
        if(err) return next(err);
        bcrypt.hash(this.passWord, salt, (err, hash)=>{
            if(err) return next(err)
            this.passWord = hash;
            next();
        })
    })
})

//比较密码方法
userSchema.methods = {
    comparePassword: (_password, password)=>{
        return new Promise((resolve, reject)=>{
            bcrypt.compare(_password, password, (err, isMatch)=>{
                if(!err){
                    resolve(isMatch)
                }else{
                    reject(err)
                }
            })
        })
    }
}

mongoose.model('User', userSchema);