const Express =  require('express');
const IngredientController =  require('./ingredient.controller');
const router = Express.Router();


router.get('/getAllIngredients' , IngredientController.getAllIngredients);
router.post('/updateIngredient',IngredientController.updateIngredient);
router.post('/register', IngredientController.register);
router.post('/getIngredientPrice', IngredientController.getIngredientPrice);
router.post('/addAll',IngredientController.addAll);

module.exports = router;