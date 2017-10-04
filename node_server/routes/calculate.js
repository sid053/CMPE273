var express = require('express');
var router = express.Router();

router.post('/add', function (req, res, next) {
  
    var var1 = parseInt(req.body.var1) ;
    var var2 = parseInt(req.body.var2) ;
    var1 = var1+var2;
    //console.log(one);
    body = JSON.stringify(var1);
    res.send(body);
});

router.post('/sub', function (req, res, next) {
  
    var var1 = parseInt(req.body.var1) ;
    var var2 = parseInt(req.body.var2) ;
    var1 = var1-var2;
    //console.log(one);
    body = JSON.stringify(var1);
    res.send(body);
});

router.post('/multiply', function (req, res, next) {
  
    var var1 = parseInt(req.body.var1) ;
    var var2 = parseInt(req.body.var2) ;
    var1 = var1*var2;
    //console.log(one);
    body = JSON.stringify(var1);
    res.send(body);
});

router.post('/divide', function (req, res, next) {
  
    var var1 = parseInt(req.body.var1) ;
    var var2 = parseInt(req.body.var2) ;
    
    var1 = var1/var2;
    //console.log(one);
    body = JSON.stringify(var1);
    res.send(body);
});

// router.post('/add', function (req, res, next) {
     
//         res.status(201).json({message: "inside add"}) 
//   });

module.exports = router;
