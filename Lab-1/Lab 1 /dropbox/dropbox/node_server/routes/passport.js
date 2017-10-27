var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var first = "User";
var second = "Table";
var table = first+'_'+second;
var User    = require('../models/User');




module.exports = function(passport) {

    passport.use('login', new LocalStrategy(function (username, password, done) {

        const uname = username;
        const pswd = password;


        User.findOne({username: username, password: password}, function (err, user) {
            if (user) {
                done(null, {username: uname, password: pswd});   //when username and password is valid
            }
            else {
                console.log("Inside the error thingy");
                done(null, false);
            }

        });

        //when error occurs
    }));
}





