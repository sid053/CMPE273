
 var ejs = require("ejs");
var User    = require('../models/User');
var fs = require("fs")
var first = "User";
var second = "Table";
var table = first+'_'+second;
var fileUpload = require('./fileUpload');
var glob = require('glob');
var passport = require('passport');

require('./passport')(passport);

function afterRegister(req,res){
var FilePath = "./UserFiles/"+req.body.username ;
var user = new User();
    user.name = req.body.name ;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function (err) { if(err){
          res.status(401).send(err);
        }
        else{
          
          fs.mkdir(FilePath, function(err) {
             if (!err) {

                       console.log(req.sessionID);
                   res.status(201).send();
                        }
             else {
                    return res.end("Dir creation failed : " + err);
                    res.status(401);
                  }
      });

      
        }
        }
        
    );
  
	
	
}
//sign in function
function afterSignIn(req,res){
	const username = req.body.username;
	var getUser = "Select password from "+table+" where username='"+username+"';";
	console.log("The query is :", getUser);
	mysql.fetchData(function(err){
   if(err){
   	console.log("Error in callback for fetchData");
   	res.status(401) ;
   }

   else{
        console.log(req.sessionID);
        
        req.session.username = username;
        req.session.loggedin = true;
    glob("UserFiles/"+username+"/*.*", function (er, files) {
         
        var resArr = files.map(function (file) {
            var imgJSON = {};
           var path = "UserFiles/"+username+"/";
           imgJSON.img = path+file.split('/')[2];
            imgJSON.cols = 2  ;
            return imgJSON;
        });
        // console.log(resArr);
     
       res.status(201).send(resArr);
    });
   }


    },getUser)
}


//logout function

function logout(req,res){
     
	req.session.destroy();
	res.status(201).send("succesfully destroyed");
}



function loginPassport(req,res,next){

	passport.authenticate('login', function(err, user, info) {
    if(err) {
      return next(err);
    }

    if(!user) {
      res.status(401).send();
    }

    req.logIn(user, {session:false}, function(err) {
      if(err) {
        return next(err);
      }

      req.session.username = user.username;
      req.session.loggedin = true;
      var username = user.username;
      console.log(req.session.username);
      console.log("session initilized");
       console.log("outside glob");
      return res.status(201).send();
    })
  })(req, res, next);

}


function getFiles(req,res,next){
  
    const username = req.session.username;
    var folderPath = "UserFiles/"+username+"/*.*" ;
     glob(folderPath, function (er, files) {
        var resArr = files.map(function (file) { 
            var imgJSON = {};
            var path = "UserFiles/"+username+"/";
           imgJSON.img = path+file.split('/')[2];
            imgJSON.cols = 2  ;
            console.log(imgJSON);
            return imgJSON;
        });
         console.log(resArr);
          res.status(201).send(resArr);
    });
  
}


exports.getFiles=getFiles;
exports.logout =logout;
exports.loginPassport = loginPassport;
exports.afterSignIn = afterSignIn ;
exports.afterRegister = afterRegister;