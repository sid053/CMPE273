var express = require('express');
var router = express.Router();

router.post('/add', function (req, res, next) {
  
    var var1 = parseInt(req.body.displayValue) ;
    var var2 = parseInt(req.body.oldnum) ;
    var1 = var1+var2;
    console.log(var1);
    console.log("will show body");
    body = {'variable' : var1};

    console.log(body);
    //console.log(typeof(var1));
    res.status(201);
    res.send(body);

});

router.post('/sub', function (req, res, next) {
  
    var var1 = parseInt(req.body.displayValue) ;
    var var2 = parseInt(req.body.oldnum) ;
    var1 = var2-var1;
    
   body = {'variable' : var1};
    console.log(body);
    res.send(body);

});

router.post('/multiply', function (req, res, next) {
  
   var var1 = parseInt(req.body.displayValue) ;
    var var2 = parseInt(req.body.oldnum) ;
    var1 = var2*var1;
    
   body = {'variable' : var1};
    console.log(body);
    res.send(body);
});

router.post('/divide', function (req, res, next) {
  
    var var1 = parseInt(req.body.displayValue) ;
    var var2 = parseInt(req.body.oldnum) ;
    var1 = var2/var1;
    
   body = {'variable' : var1};
    console.log(body);
    res.send(body);
});

// router.post('/add', function (req, res, next) {
     
//         res.status(201).json({message: "inside add"}) 
//   });

module.exports = router;
