var express = require('express');
var router = express.Router();

var home = require('./home');





/* GET users listing. */

router.post('/doRegister', home.afterRegister);

router.post('/doLogout' , home.logout);

router.post('/login', home.loginPassport);


router.get('/getFiles',home.getFiles);

router.post('/validateUser' , home.validateUser);




module.exports = router;
