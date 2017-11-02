// var passport = require("passport");
// var LocalStrategy = require("passport-local").Strategy;
// var first = "User";
// var second = "Table";
// var table = first+'_'+second;
// var User    = require('../models/User');
// var kafka = require('./kafka/client');
//
//
//
// module.exports = function(passport) {
//
//     passport.use('login', new LocalStrategy(function (username, password, done) {
//
//         const uname = username;
//         const pswd = password;
//         User.findOne({username: username, password: password}, function (err, user) {
//             if (user) {
//                 done(null, {username: uname, password: pswd});   //when username and password is valid
//             }
//             else {
//                 console.log("Inside the error thingy");
//                 done(null, false);
//             }
//
//         });
//
//         console.log('in passport');
//         kafka.make_request('login_topic',{"username":username,"password":password}, function(err,results){
//             console.log('in result');
//             console.log(results);
//             if(err){
//                 done(err,{});
//             }
//             else
//             {
//                 if(results.code == 200){
//                     done(null,{username:uname,password:pswd});
//                 }
//                 else {
//                     done(null,false);
//                 }
//             }
//         });
//
//
//
//         //when error occurs
//     }));
// }
//
//
//
//
//
