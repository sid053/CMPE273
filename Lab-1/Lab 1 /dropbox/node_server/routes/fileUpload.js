var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');

var username = req.session.username ;
var resArr;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //  console.log("Inside multer updated code");

        console.log(req.sessionID);
       console.log(req.session);
      const username ="./UserFiles/"+req.session.user; 

        cb(null,username);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname)
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
 
     console.log("inside check function at node ");
     console.log(req.session.loggedin);
     if(req.session.loggedin=== true){
        console.log("foobar")
         const username = req.session.user;

  glob("UserFiles/"+username+"/*.*", function (er, files) {
         
         resArr = files.map(function (file) {
            var imgJSON = {};
           var path = "UserFiles/"+username+"/";
           imgJSON.img = path+file.split('/')[2];
            imgJSON.cols = 2  ;
          //  console.log(imgJSON);
            console.log("asdk");
            return imgJSON;

        });
         });
  //console.log(resArr);
   res.status(201).json(resArr);
     }

    else{
        console.log("return nothing")
     res.status(401);
    }

});


router.post('/share' , function(req,res){

  console.log("inside share");
  const file = req.body.filepath;
  var usertoshare = req.body.username ;




    mv("./files/" + req.files[0].filename, "./files/" + req.body.path + "/"
        + req.files[0].filename, function(err) {

      if (err) {
        console.log(err);
      }
    });
    res.status(201); 

  });




router.post('/delete', function(req,res){

console.log("inside Delete ");
var filepath = req.body.filepath ;
console.log("The file to be deleted is ");
console.log(filepath);

rm("./files"+filepath ,function(err){
  if (err){
    console.log("error in deleting");
    res.status(305) ; // my own code to let react know that there was some error deleting the file

  }

  res.status(201);
})



})



module.exports = router;