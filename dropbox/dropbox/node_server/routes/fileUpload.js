var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');
//const username = "yashvi"
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //  console.log("Inside multer updated code");
        console.log(req.sessionID);
        const username = req.session.username; 
        cb(null, './UserFiles/'+username)
    },
    filename: function (req, file, cb) {
        cb(null, file.original)
    }
});

var upload = multer({storage:storage});
router.post('/upload', upload.single('mypic'),function (req, res, next) {
    
    console.log("inside post upload");
    console.log(req.body.username);
    console.log(req.file);

    res.status(204).end();
});


router.get('/check', function(req,res){
 
     console.log("Inside checkrequest");
     console.log(req.sessionID);
     console.log("check session logged in");
     console.log("here i am");
    // console.log(req.session.loggedin);
     if(req.session.loggedin=== true){
        res.status(201).send("User Logged in");
     }
     res.status(401).send("Not logged in ");

});





module.exports = router;