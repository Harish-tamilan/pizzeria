const EventEmitter = require('events');
const PizzaModel = require('./pizza.model');

exports.register = function (data) {
    const emitter = new EventEmitter();
    var pizzadata = new PizzaModel(data);
    
    pizzadata.save().then(function(result){
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

exports.getAllPizzas = function(data){


    var emitter = new EventEmitter();

    PizzaModel.find().then(function(result){
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

exports.updatePizza = function(data){
    var query={
        id:data.id
    }
    return new Promise(function(resolve,reject)
    {
        PizzaModel.updateOne(query,{$set:{verified:true}}).then(function(result){
            if(result.nModified)
            {
                console.log('Result is ' + result);
                resolve("Data updated successfully");
            }
            else
            {
                reject("Pizza does not exits");
            }
        },function(error){
            if(error)
            {
                reject("Internal server error");
            }
        })
    })
}

exports.deletePizza = function(data){

    var emitter = new EventEmitter();

    var query = {
        id:data.id
    }
    PizzaModel.deleteOne(data).then(function(result){
        if(result){
            console.log('Deleted')
            emitter.emit('SUCCESS');
        }
        else
        {
            emitter.emit('Not found');
        }

    },function(error){
        if(error)
        {
            emitter.emit('ERROR');
        }
    })
    return emitter;
}