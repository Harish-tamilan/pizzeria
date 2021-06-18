const Express =  require('express');
const UserController =  require('./user.controller');
const router = Express.Router();

router.post('/searchUser',UserController.searchUser);
router.post('/register', UserController.register);
router.get('/getAllUsers' , UserController.getAllUsers);
router.post('/updateUser',UserController.updateUser);
router.post('/logout',UserController.logout);

module.exports  = router

// Seperation of concerns 
// 