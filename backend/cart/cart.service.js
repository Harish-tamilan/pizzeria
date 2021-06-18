const EventEmitter = require('events');
const CartModel = require('./cart.model');

exports.register = function (data) {
    const emitter = new EventEmitter();
    var cartdata = new CartModel(data);
    
    cartdata.save().then(function(result){
        emitter.emit('SUCCESS');
        console.log("Result of the db operation ",result);
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

exports.getAllCarts = function(data){


    var emitter = new EventEmitter();

    var query={
        email:data.email
    }
    console.log('Inside getAllCarts method ',data);
    CartModel.find(query).then(function(result){
        if(result)
        {
            console.log('Result is ' + result +'----->>>>end');
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

exports.updateCart = function(data){
    var query={
        id:data.id
    }
    console.log('Inside updateCart method in cart.service.js');
    return new Promise(function(resolve,reject)
    {
        CartModel.updateOne(query,{$set:{quantity:data.quantity}}).then(function(result){
            if(result.nModified)
            {
                console.log('Result is ' + result);
                resolve("Data updated successfully");
            }
            else
            {
                reject("Cart Item does not exits");
            }
        },function(error){
            if(error)
            {
                reject("Internal server error");
            }
        })
    })
}

exports.updateTopping = function(data){
    var query={
        id:data.id
    }
    console.log('Inside updateTopping method in cart.service.js, data is ',data);
    return new Promise(function(resolve,reject)
    {
        CartModel.updateOne(query,{$set:{topping_quantity:data.topping_quantity, price:data.price}}).then(function(result){
            if(result.nModified)
            {
                console.log('Result is ' + result);
                resolve("Data updated successfully");
            }
            else
            {
                reject("Cart Item does not exits");
            }
        },function(error){
            if(error)
            {
                reject("Internal server error");
            }
        })
    })
}

exports.getCarts = function(data){

    var emitter = new EventEmitter();

    
    CartModel.find().then(function(result){
        if(result)
        {
            console.log('Result is ' + result +'----->>>>end');
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

exports.search = function(data){

    console.log('Inside search method in cart.service');
    var emitter = new EventEmitter();
    var query = {
        id:data.id,
        email:data.email
    }
    console.log('Query is '+ query);
    CartModel.findOne(query).then(function(result,item){
        if(result)
        {
           // console.log('Item already present in the cart, Item is '+result);
            console.log('Item found is '+result);
            emitter.emit('SUCCESS',result);
        }
        else
        {
            console.log('Item not found in the cart');
            emitter.emit('Not Found');
        }
    },function(error){
        if(error)
        {
            emitter.emit('ERROR');
        }
    })
    return emitter;
}

exports.deleteCart = function(data){

    var emitter = new EventEmitter();

    var query = {
        id:data.id,
        email:data.email
    }
    console.log('Inside deleteCart method in cart.service.js ', data);
    CartModel.deleteOne(data).then(function(result){
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

exports.deleteAll = function(data){

    var emitter = new EventEmitter();

   
    console.log('Inside deleteCart method in cart.service.js ', data);
    CartModel.deleteMany().then(function(result){
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
