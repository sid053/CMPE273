
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
 var kafka = require('./kafka/client');

function afterRegister(req,res){
//var FilePath = "./UserFiles/"+req.body.username ;




    // user.save(function (err) { if(err){
    //       res.status(401).send(err);
    //     }
    //     else{
    //
    //       fs.mkdir(FilePath, function(err) {
    //          if (!err) {
    //
    //                    console.log(req.sessionID);
    //                res.status(201).send();
    //                     }
    //          else {
    //                 return res.end("Dir creation failed : " + err);
    //                 res.status(401);
    //               }
    //   });
    //
    //
    //     }
    //     }
    //
    // );
    //

    kafka.make_request('signUp',req.body,'SignUp', function(err,results){
        console.log('response from kafka for user validation');
        console.log(results);
        if(err){
            console.log(err);
        }
        else
        {

            if(results.code==='200'){
                res.status(201).send("User Registered");
            }
            else{
                res.status(401).send("User not Registered");
            }
        }
    });


	
}



//logout function

function logout(req,res){
     
	req.session.destroy();
	res.status(201).send("succesfully destroyed");
}


//login Function
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


    kafka.make_request('files',{"username":username},'getfiles', function(err,results){
        console.log('response from kafka for user validation');
        console.log(results);
        if(err){
            console.log(err);
        }
        else
        {

            if(results.code==='200'){

                res.status(201).send(results.files);
            }
            else{
                res.status(401).send("no files to return");
            }
        }
    });



}

function validateUser(req,res,next) {
       console.log(req.body.shareUsername);
       var shareUsername = req.body.shareUsername;
     //  var callingFunction = validateUser1 ;
      console.log("Inside validate user function")
    kafka.make_request('validate',{"username":shareUsername},'validateuser1', function(err,results){
        console.log('response from kafka for user validation');
        console.log(results);
        if(err){
           console.log(err);
        }
        else
        {

          if(results.code==='200'){
              res.status(201).send("Username is valid");
          }
          else{
              res.status(401).send("Username not valid");
          }
        }
    });



    // User.findOne({username: req.body.shareUsername}, function (err,user) {
    //     if(err){
    //         console.log(err);
    //     }
    //
    //     if (user) {
    //         res.status(201).send("username is valid");
    //     }
    //     else {
    //         console.log("Inside the error thingy");
    //         res.status(401).send("this is error");
    //     }
    //
    // });

}



exports.validateUser = validateUser;
exports.getFiles=getFiles;
exports.logout =logout;
exports.loginPassport = loginPassport;
exports.afterRegister = afterRegister;