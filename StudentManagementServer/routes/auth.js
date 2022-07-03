const router = require('express').Router();
const {loginController, registerController} = require('../controller/auth');



/**
 * Register a User
 */

 router.post('/register', registerController);

 /**
  * Login A user
  */

 router.post('/login', loginController);



 module.exports  = router;