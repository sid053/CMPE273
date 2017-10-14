var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var home = require('./home');





/* GET users listing. */

router.post('/doLogin',home.afterSignIn)

router.post('/doRegister', home.afterRegister);

router.post('/doLogout' , home.logout);

router.post('/login', home.loginPassport);

router.get('/',home.getFiles);


module.exports = router;
