const Mongoose = require('mongoose');

const cartSchema = new Mongoose.Schema({
    id:{type:String},
    type:{type:String},
    price:{type:Number,required:true},
    name:{type:String,required:true},
    image:{type:String},
    topping:{type:Array},
    topping_quantity:{type:Array},
    quantity:{type:Number},
    email:{type:String}
});

const CartModel = Mongoose.model('cart',cartSchema);
module.exports = CartModel