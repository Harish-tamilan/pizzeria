const CartService = require('./cart.service');

exports.register =  function(req,res){
    console.log("Inside the register method in controller and the request body is ",req.body);
    var bool = false;
    CartService.search(req.body)
    .on('SUCCESS',function(data){
        console.log('Item already exist, data is '+data);
        data.quantity = data.quantity+1;
        CartService.updateCart(data).then(function(data){
            res.send({
                message:"Cart Item Updated"
            })
        },function(data){
            res.send({
                message:"Error Updating Cart"
            })
        });
    })
    .on('Not Found',function(){
        CartService.register(req.body)
        .on('ERROR',function(){
            res.status(500).send({
                error:"Internal Server Error"
            })
        })
        .on('SUCCESS',function(){
            res.send({
                message:"Cart Registered"
            })
        })
        .on('DUPLICATE',function(){
            res.send({
                message:"Cart already exist"
            })
        })
    });
    
 }

 exports.getAllCarts = function(req,res){
    console.log("Inside the getAllCarts function in cart.controller.js ",req.body);
    CartService.getAllCarts(req.body)
    .on('NULL',function(){
       res.send({
           message:"Invalid cartname/password"
       })
    })
    .on('ERROR',function(){
        res.send({
            message:"Internal Server Error"
        })
    })
    .on('SUCCESS',function(data){
        //console.log(data);
        res.send({
            data
        })
    })
}

exports.getCarts = function(req,res){
    console.log("Inside the getAllCarts function in cart.controller.js ",req.body);
    CartService.getCarts(req.body)
    .on('NULL',function(){
       res.send({
           message:"Invalid cartname/password"
       })
    })
    .on('ERROR',function(){
        res.send({
            message:"Internal Server Error"
        })
    })
    .on('SUCCESS',function(data){
        //console.log(data);
        res.send({
            data
        })
    })
}

exports.updateCart = function(req,res){
    console.log("Inside the updateCart function in cart.controller.js");
    CartService.updateCart(req.body).then(function(data){
        res.send({
            message:data
        })
    },function(data){
        res.send({
            message:data
        })
    });
}

exports.updateTopping = function(req,res){
    console.log("Inside the updateCart function in cart.controller.js");
    CartService.updateTopping(req.body).then(function(data){
        res.send({
            message:"Success"
        })
    },function(data){
        res.send({
            message:data
        })
    });
}

exports.deleteCart = function(req,res){
    console.log("Inside the deleteCart function in cart.controller.js ",req.body);
    CartService.deleteCart(req.body)
    .on('Not found',function(){
        res.send({
            message:"Invalid cartname/password"
        })
     })
     .on('ERROR',function(){
         res.send({
             message:"Internal Server Error"
         })
     })
     .on('SUCCESS',function(){
         //console.log(data);
         console.log('Returned from deleteCart in cart.delete')
         res.send({
             message:"Deleted Successfully"
         })
     })
}

exports.deleteAll = function(req,res){
    CartService.deleteAll(req.body)
    .on('Not found',function(){
        res.send({
            message:"Invalid cartname/password"
        })
     })
     .on('ERROR',function(){
         res.send({
             message:"Internal Server Error"
         })
     })
     .on('SUCCESS',function(){
         //console.log(data);
         console.log('Returned from deleteCart in cart.delete')
         res.send({
             message:"Deleted Successfully"
         })
     })
}

exports.getTotal = function(req,res){
    CartService.getAllCarts(req.body)
    .on('NULL',function(){
       res.send({
           message:"Invalid cartname/password"
       })
    })
    .on('ERROR',function(){
        res.send({
            message:"Internal Server Error"
        })
    })
    .on('SUCCESS',function(data){
        //console.log(data);
        res.send({
            price:data.price
        })
    })
}