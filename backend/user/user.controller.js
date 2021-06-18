const UserService = require('./user.service');
var session = require('express-session')

exports.register =  function(req,res){
    console.log("Inside the register method in controller and the request body is ",req.body);
    UserService.register(req.body)
    .on('ERROR',function(error){
        res.status(500).send({
            error:"Internal Server Error"
        })
    })
    .on('SUCCESS',function(){
        res.send({
            message:"User Registered"
        })
    })
    .on('DUPLICATE',function(){
        res.send({
            message:"User already exist"
        })
    })
 }

 exports.logout = function(req,res){
    req.session.destroy();
    res.send({
        message:"Logout successful"
    })
 }

 exports.searchUser = function(req,res){
     console.log("Inside the searchUser function in user.controller.js");
     
     UserService.searchUser(req.body)
     .on('NULL',function(){
        res.send({
            message:"Invalid username/password"
        })
     })
     .on('ERROR',function(){
         res.send({
             message:"Internal Server Error"
         })
     })
     .on('SUCCESS',function(user){
        //  if(flag=="Protected")
        //  {
        //     res.send({
        //         message:"Login Successfull"
        //     })
        // }
        // else
        // {
        //     res.send({
        //         message:"Token not matched"
        //     })
        // }
        req.session.user = user;
        res.send({
            message:"Success"
        })
     })
    }

 exports.getAllUsers = function(req,res){
    console.log("Inside the getAllUsers function in user.controller.js");
    UserService.getAllUsers(req.body)
    .on('NULL',function(){
       res.send({
           message:"Invalid username/password"
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
            message:"Users found",
            users:data
        })
    })
}

exports.updateUser = function(req,res){
    console.log("Inside the updateUser function in user.controller.js");
    UserService.updateUser(req.body).then(function(data){
        res.send({
            message:data
        })
    },function(data){
        res.send({
            message:data
        })
    });
}

