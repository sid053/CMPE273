var User    = require('./models/User');
var fs = require('fs');



function handle_Login_request(msg, callback){

    console.log("In handle request:"+ JSON.stringify(msg));

    User.findOne({username: msg.username, password: msg.password}, function (err, user) {
        var res = {};
        if (user) {
            console.log("inside valid user");
            res.code = "200";
            res.value = "Success Login";

        }
        else {
            console.log("Inside the error thingy");
            res.code = "401";
            res.value = "Failed Login";

        }callback(null, res);

    });

}


function handle_Validate_request(msg,callback) {
    console.log("Inside validate username function" + JSON.stringify(msg));


    User.findOne({username:msg.username}, function (err,user) {
        var res = {};
        if(user){
            console.log("User is valid ");
            res.code = "200";
            res.value = "success validation";

        }
        else{
            console.log("Inside the error for validation");
            res.code = "401";
            res.value = "Failed Validation";
        }callback(null,res);
    })

}


function handle_SignUp_request(msg,callback) {
    console.log("inside the Signup function")
var FilePath = "./services/UserFiles/"+msg.username;
    console.log("The file path should be "+FilePath);
var user = new User();
    user.name = msg.name ;
    user.username = msg.username;
    user.email = msg.email;
    user.password = msg.password;
    console.log(user);

    user.save(function (err) {
        console.log("Inside Save function");
        var res = {}
        if(err){
          res.code = "401";
          res.value = "User not registered";
          console.log(err);
        }
        else{
        console.log("inside the else of save");
        console.log("****************");
          fs.mkdir(FilePath, function(err) {
             if (!err) {
                 console.log("Inside the file creation");
                 res.code = "200";
                 res.value = "User Created";
                 console.log(res.code);
             }
             else {
                 res.code = "401";
                 res.value = "User not registered";
                 console.log("inside creating directory error");

             }
                  callback(null,res);
           }

           );
        //  console.log(res.code+"the code is this");

        }
        });

}


function file_Upload(msg,callback) {


    var folderPath = "./services/UserFiles/sid/sid12356.jpg" ;
    console.log(folderPath);
    var res = {};

    fs.writeFile(folderPath,new Buffer(msg.file,'base64'),function(err){

        if(!err){
            res.code='200';
        }
        callback(null,res);

    });



}

exports.file_Upload = file_Upload;
exports.handle_SignUp_request = handle_SignUp_request;
exports.handle_Login_request = handle_Login_request;
exports.handle_Validate_request = handle_Validate_request ;