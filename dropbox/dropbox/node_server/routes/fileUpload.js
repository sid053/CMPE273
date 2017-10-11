var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpeg')
    }
});

var upload = multer({storage:storage});

/* GET users listing. */
router.get('/', function (req, res, next) {
  //  var resArr = [];
    //     console.log("Inside get for API ");
    //  console.log(req.body);
    // glob("public/uploads/*.jpeg", function (er, files) {

    //     var resArr = files.map(function (file) {
    //         var imgJSON = {};
    //         imgJSON.img = 'uploads/'+file.split('/')[2];
    //         imgJSON.cols = 2  ;
    //         return imgJSON;
    //     });

    //     console.log(resArr);
    //     res.status(200).send(resArr);
    // });

});

function sendImages(callback){
   console.log("Inside get for API ");
     console.log(req.body);
    glob("public/uploads/*.jpeg", function (er, files) {

        var resArr = files.map(function (file) {
            var imgJSON = {};
            imgJSON.img = 'uploads/'+file.split('/')[2];
            imgJSON.cols = 2  ;
            return imgJSON;
        });

        //console.log(resArr);
       // res.status(200).send(resArr);
    });

  callback(err ,resArr);

}



router.post('/upload', upload.single('mypic'), function (req, res, next) {
   
    console.log("inside post upload");
    console.log(req.body.username);
    console.log(req.file);

    res.status(204).end();
});

exports.sendImages = sendImages ;
module.exports = router;
