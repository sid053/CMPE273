var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var first = "User";
var second = "Table";
var table = first+'_'+second;
var mysql = require("./mysql");
var glob = require('glob');


module.exports = function(passport) {

    passport.use('login', new LocalStrategy(function(username, password, done) {
 				
       					const uname = username ;
       					const pswd = password ;
                var getUser = "Select password from "+table+" where username='"+username+"';";
                console.log(getUser);

            	mysql.fetchData(function(err){
   		if(err){
   		console.log("Error in callback for fetchData");
        done(null,false); 
  		 }

   		else{
       done(null,{username:uname,password:pswd});   //when username and password is valid

   		}


    		},getUser)

             //when error occurs
    }));
}


