const PizzaService = require('./pizza.service');
var session = require('express-session')

exports.register =  function(req,res){
    console.log("Inside the register method in controller and the request body is ",req.body);
    PizzaService.register(req.body)
    .on('ERROR',function(){
        res.status(500).send({
            error:"Internal Server Error"
        })
    })
    .on('SUCCESS',function(){
        res.send({
            message:"Pizza Registered"
        })
    })
    .on('DUPLICATE',function(){
        res.send({
            message:"Pizza already exist"
        })
    })
 }

 exports.getAllPizzas = function(req,res){
    // if(!req.session.user)
    // {
    //     res.send({
    //         data:"Not Logged In"
    //     })
    // }
    console.log("Inside the getAllPizzas function in pizza.controller.js");
    PizzaService.getAllPizzas(req.body)
    .on('NULL',function(){
       res.send({
           message:"Invalid pizzaname/password"
       })
    })
    .on('ERROR',function(){
        res.send({
            message:"Internal Server Error"
        })
    })
    .on('SUCCESS',function(data){
        console.log(data);
        res.send({
            data
        })
    })
}

exports.updatePizza = function(req,res){
    console.log("Inside the updatePizza function in pizza.controller.js");
    PizzaService.updatePizza(req.body).then(function(data){
        res.send({
            message:data
        })
    },function(data){
        res.send({
            message:data
        })
    });
}

exports.deletePizza = function(req,res){
    console.log("Inside the deletePizza function in pizza.controller.js");
    PizzaService.deletePizza(req.body)
    .on('Not found',function(){
        res.send({
            message:"Invalid pizzaname/password"
        })
     })
     .on('ERROR',function(){
         res.send({
             message:"Internal Server Error"
         })
     })
     .on('SUCCESS',function(data){
         console.log(data);
         res.send({
             message:"Deleted Successfully"
         })
     })
}