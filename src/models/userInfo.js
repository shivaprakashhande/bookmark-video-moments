const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    eMail:String,
    password:String
})

module.exports=mongoose.model('UserInfo',userSchema);