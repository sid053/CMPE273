var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');
//const username = "yashvi"
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("Inside multer updated code");
        console.log(req.sessionID);
        const username = req.session.username; 
        console.log("username and the file to be uploaded")
        console.log(username);
        cb(null, './UserFiles/'+username)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpeg')
    }
});

var upload = multer({storage:storage});




router.post('/upload', upload.single('mypic'),function (req, res, next) {
    
    console.log("inside post upload");
    console.log(req.body.username);
    console.log(req.file);

    res.status(204).end();
});


module.exports = router;