const exp = require('express')
const server = exp()
const Mongoose=require('mongoose')
const BodyParser=require('body-parser')
var cors = require('cors')
const path = require('path')
var session = require('express-session')
const port = process.env.port || 5001

const PizzaRoutes = require('./pizza');
const IngredientRoutes = require('./ingredient');
const CartRoutes = require('./cart');
const UserRoutes = require('./user')

const dburl = "mongodb://localhost:27017/pizzaorder";

Mongoose.connect(dburl).then(function(client){
    console.log("connected to the database");
},(error)=>{
    console.log("Error in connecting to database "+error);
})
server.use(cors());
server.use(BodyParser.json())
server.use(exp.static(path.join(__dirname,'../frontend/dist/')))
server.use(session({secret:"qughqhi123pso19aon",resave:false,saveUninitialized:true}))
server.use('/pizza' , PizzaRoutes)
server.use('/ingredient',IngredientRoutes)
server.use('/cart',CartRoutes)
server.use('/user',UserRoutes)

server.listen(port , function(){
    console.log("Server is running on" , port)
})