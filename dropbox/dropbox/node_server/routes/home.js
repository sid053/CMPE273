
 var ejs = require("ejs");
var mysql = require('./mysql');
var fs = require("fs")
var first = "User";
var second = "Table";
var table = first+'_'+second;
var fileUpload = require('./fileUpload');
var glob = require('glob');


function afterRegister(req,res){

console.log(table);
      const FilePath = "UserFiles/"+req.param("username");
	var insertUser = "Insert into "+table+" values('"+req.param("name")+"','"+req.param("username")+"','"+req.param("email")+"','"+req.param("password")+"')";
	console.log("The query is :" , insertUser);
	mysql.putData(function(err){
		if(err){
			console.log("error in the callback for after register");
               res.status(401);		
 				}
		
		
		else{
               
            fs.mkdir(FilePath, function(err) {
		         if (!err) {
			                   console.log("directory created") ;
			                  console.log("checking");
			                    console.log(req.sessionID);
        					 res.status(201).send();    
		                    }
		         else {
			              return res.end("Dir creation failed : " + err);
			              res.status(401);
		              }
			});
         }
	},insertUser);
	
	
}

function afterSignIn(req,res){
const username = req.param("username");
var getUser = "Select password from "+table+" where username='"+username+"';";
console.log("The query is :", getUser);
mysql.fetchData(function(err){
   if(err){
   	console.log("Error in callback for fetchData");
   	res.status(401) ;
   }

   else{

  
    console.log("Inside afterSign in for sending files back");
     req.session.user = username;
     console.log("After assigning the user in the session");
     console.log(req.sessionID);
     console.log("Session");
     //console.log(req.session);

    glob("UserFiles/"+username+"/*.jpeg", function (er, files) {
            console.log("inside glob");
            console.log(username)
        var resArr = files.map(function (file) {
            var imgJSON = {};
           var path = "UserFiles/"+username+"/";
           imgJSON.img = path+file.split('/')[2];
            imgJSON.cols = 2  ;
            return imgJSON;
        });
         console.log(resArr);
     
       res.status(201).send(resArr);
    });



   	
   
   }


},getUser)


}

exports.afterSignIn = afterSignIn ;
exports.afterRegister = afterRegister;