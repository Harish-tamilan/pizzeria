const Mongoose = require('mongoose')

const userSchema = new Mongoose.Schema({
    email:{type:String, unique:true, required:true},
    name:{type:String,required:true},
    password:{type:String, required:true},
    phone:{type:Number},
    gender:{type:String},
    verified:{type:Boolean,default:false},
    created:{type:Date,default:new Date()}
});

const UserModel = Mongoose.model('users',userSchema);

//UserModel.findOne(query).then()

module.exports = UserModel