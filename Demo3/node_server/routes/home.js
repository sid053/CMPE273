
 var ejs = require("ejs");
var passport = require('passport');
require('./passport')(passport);
 var mongoose   = require('mongoose');
 var mongo = require('mongodb');
 var User    = require('../models/User');
 mongoose.connect('mongodb://localhost/cmpe_273')
 var db = mongoose.connection;
 var mongo = require("./mongo");

function afterRegister(req,res){

	// console.log(table);
     //  const FilePath = "UserFiles/"+req.body.username;
	// var insertUser = "Insert into "+table+" values('"+req.body.name+"','"+req.body.username+"','"+req.body.email+"','"+req.body.password+"')";
	// console.log("The query is :" , insertUser);
    //
	// mysql.putData(function(err){
	// 	if(err){
	// 		console.log("error in the callback for after register");
     //           res.status(401);
 	// 			}
	//
	//
	// 	else{
     //
     //        fs.mkdir(FilePath, function(err) {
	// 	         if (!err) {
	//
	// 		                  console.log(req.sessionID);
     //    					 res.status(201).send();
	// 	                    }
	// 	         else {
	// 		              return res.end("Dir creation failed : " + err);
	// 		              res.status(401);
	// 	              }
	// 		});
     //     }
	// },insertUser);

    var user = new User();
    user.name = req.body.name ;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function (err) { if(err){
        res.status(401).send(err);
        }
        else{
        res.status(201).send("you have registered");
        }
        }
        
    );
	
	
}

//logout function

function logout(req,res){
     
	req.session.destroy();
	res.status(201).send("succesfully destroyed");
}


 //sign in function

function loginPassport(req,res,next){

	passport.authenticate('login', function(err, user, info) {
    if(err) {
      return next(err);
    }

    if(!user) {
        console.log("Here I am about to send an error");
      res.status(401).send("Username and password not correct");
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
      return res.status(201).send("You have logged In");
    })
  })(req, res, next);

}


// function getFiles(req,res,next){
//
//     const username = req.session.username;
//     var folderPath = "UserFiles/"+username+"/*.*" ;
//      glob(folderPath, function (er, files) {
//         var resArr = files.map(function (file) {
//             var imgJSON = {};
//             var path = "UserFiles/"+username+"/";
//            imgJSON.img = path+file.split('/')[2];
//             imgJSON.cols = 2  ;
//             console.log(imgJSON);
//             return imgJSON;
//         });
//          console.log(resArr);
//           res.status(201).send(resArr);
//     });
  


function checkSession(req,res,next){
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

}





exports.logout =logout;
exports.loginPassport = loginPassport;
exports.afterRegister = afterRegister;
exports.checkSession = checkSession;