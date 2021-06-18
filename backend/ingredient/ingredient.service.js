const EventEmitter = require('events');
const IngredientModel = require('./ingredient.model');

exports.register = function (data) {
    const emitter = new EventEmitter();
    var ingredientdata = new IngredientModel(data);
    
    ingredientdata.save().then(function(result){
        emitter.emit('SUCCESS');
        console.log("Result of the db operation ",results);
    },function(error){
        console.log("Error of the db operation ",error);
        if(error.code==11000)
        {
            emitter.emit("DUPLICATE");
        }
        else
        {
            emitter.emit('ERROR');
        }
    })
    return emitter;
};

exports.getAllIngredients = function(data){


    var emitter = new EventEmitter();

    IngredientModel.find().then(function(result){
        if(result)
        {
            console.log('Result is ' + result);
            emitter.emit("SUCCESS",result);
           
        }
        else
        {
            emitter.emit("NULL");
        }
    },function(error){
        if(error)
        {
            emitter.emit("ERROR");
        }
    })
    return emitter;
}

exports.updateIngredient = function(data){
    var query={
        id:data.id
    }
    return new Promise(function(resolve,reject)
    {
        IngredientModel.updateOne(query,{$set:{verified:true}}).then(function(result){
            if(result.nModified)
            {
                console.log('Result is ' + result);
                resolve("Data updated successfully");
            }
            else
            {
                reject("Ingredient does not exits");
            }
        },function(error){
            if(error)
            {
                reject("Internal server error");
            }
        })
    })
}

exports.getIngredientPrice = function(data){
    var query={
        tname:data.name
    }
    var emitter = new EventEmitter();

    IngredientModel.findOne(query).then(function(result){
        if(result){
            emitter.emit('SUCCESS',result);
        }
        else{
            emitter.emit('Not Found',result);
        }
    },function(error){
        if(error)
        {
            emitter.emit('Error');
        }
    })
    return emitter;
}