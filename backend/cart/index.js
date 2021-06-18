const Express =  require('express');
const CartController =  require('./cart.controller');
const router = Express.Router();


router.post('/getAllCarts' , CartController.getAllCarts);
router.get('/getCarts',CartController.getCarts);
router.post('/updateCart',CartController.updateCart);
router.post('/updateTopping',CartController.updateTopping);
router.post('/register', CartController.register);
router.post('/delete', CartController.deleteCart);
router.get('/deleteAll',CartController.deleteAll);
router.post('/getTotal',CartController.getTotal);

module.exports = router;