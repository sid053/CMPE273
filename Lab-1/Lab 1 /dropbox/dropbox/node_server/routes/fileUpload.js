var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //  console.log("Inside multer updated code");

        console.log(req.sessionID);
       console.log(req.session);
      const username ="./UserFiles/"+req.session.username; 

        cb(null,username);
    },
    filename: function (req, file, cb) {

      console.log(file);
        cb(null, file.originalname);
    }
});

var upload = multer({storage:storage});

router.post('/upload', upload.single('mypic'),function (req, res, next) {
    var username = req.session.username ;
    console.log("inside post upload");
    console.log(req.body.username);
    console.log(req.file);

    res.status(204).end();
});


router.get('/check', function(req,res){
     var username = req.session.username ;
     console.log("inside check function at node ");
     console.log(req.session.loggedin);
     if(req.session.loggedin=== true){
         console.log("foobar")
         const username = req.session.user;
         res.status(201).send();
     }

    else{
        console.log("return nothing")
        res.status(401).send();
    }

});


router.post('/delete' , function (req,res) {
    console.log("inside Delete");
    console.log(req.body);
    res.status(201).send() ;

})
module.exports = router;