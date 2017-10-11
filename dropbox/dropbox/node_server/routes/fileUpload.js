var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("inside multer");
        console.log()
        console.log('./UserFiles/'+req.body.username)
        cb(null, './UserFiles/'+req.body.username)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpeg')
    }
});

var upload = multer({storage:storage});

/* GET users listing. */
router.get('/', function (req, res, next) {
    var resArr = [];
    console.log("Inside get all files");
    console.log(req);
    var filepath = "UserFiles/"+req.body.username+"*.jpeg" ;
    glob(filepath, function (er, files) {

        var resArr = files.map(function (file) {
            var imgJSON = {};
            imgJSON.img = 'uploads/'+file.split('/')[2];
            imgJSON.cols = 2  ;
            return imgJSON;
        });

        console.log(resArr);
        res.status(200).send(resArr);
    });

});

router.post('/upload', upload.single('mypic'), function (req, res, next) {
    //console.log(req.body);
    //console.log(req.username);
    console.log(req.body.username);
    console.log(req.file);

    res.status(204).end();
});

module.exports = router;
