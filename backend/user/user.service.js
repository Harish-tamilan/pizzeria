const EventEmitter = require('events');
const UserModel = require('./user.model');

//const { emit } = require('process')

exports.register = function (data) {
    const emitter = new EventEmitter();
    var userdata = new UserModel(data);
    
    userdata.save().then(function(result){
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
            emitter.emit('ERROR',error);
        }
    })
    return emitter;
};

exports.searchUser = function(data){
    var query={
        email:data.email,
        password:data.password
    }

    var emitter = new EventEmitter();

    UserModel.findOne(query).then(function(result,user){
        if(result)
        {
            console.log(result);
            emitter.emit("SUCCESS",user);
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

exports.searchAllUsers = function(data){
    var query={
        password:data.password
    }

    var emitter = new EventEmitter();

    UserModel.find(query).then(function(result){
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

exports.getAllUsers = function(data){


    var emitter = new EventEmitter();

    UserModel.find().then(function(result){
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

exports.updateUser = function(data){
    var query={
        email:data.email
    }
    return new Promise(function(resolve,reject)
    {
        UserModel.updateOne(query,{$set:{verified:true}}).then(function(result){
            if(result.nModified)
            {
                console.log('Result is ' + result);
                resolve("Data updated successfully");
            }
            else
            {
                reject("User does not exits");
            }
        },function(error){
            if(error)
            {
                reject("Internal server error");
            }
        })
    })
}


