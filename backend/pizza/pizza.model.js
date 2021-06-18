const Mongoose = require('mongoose');

const pizzaSchema = new Mongoose.Schema({
    id:{type:Number,unique:true,required:true},
    type:{type:String},
    price:{type:Number,required:true},
    name:{type:String,required:true},
    image:{type:String},
    description:{type:String},
    ingredients:{type:Array},
    topping:{type:Array}
});

const PizzaModel = Mongoose.model('pizza',pizzaSchema);
module.exports = PizzaModel