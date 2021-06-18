const Express =  require('express');
const PizzaController =  require('./pizza.controller');
const router = Express.Router();


router.get('/getAllPizzas' , PizzaController.getAllPizzas);
router.post('/updatePizza',PizzaController.updatePizza);
router.post('/register', PizzaController.register);
router.post('/delete', PizzaController.deletePizza);

module.exports = router;