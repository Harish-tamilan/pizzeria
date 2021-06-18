const Mongoose = require('mongoose');

const ingredientSchema = new Mongoose.Schema({
    id:{type:Number,unique:true,required:true},
    tname:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String}
});

const IngredientModel = Mongoose.model('ingredient',ingredientSchema);
module.exports = IngredientModel