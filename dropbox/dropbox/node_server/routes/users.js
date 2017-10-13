var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var home = require('./home');





/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/doLogin',home.afterSignIn)

router.post('/doRegister', home.afterRegister);


module.exports = router;
