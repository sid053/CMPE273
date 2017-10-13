
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
      const FilePath = "UserFiles/"+req.body.username;
	var insertUser = "Insert into "+table+" values('"+req.body.name+"','"+req.body.username+"','"+req.body.email+"','"+req.body.password+"')";
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
			                   var sessData = req.session;
  								sessData.someAttribute = "siddharth";
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
    glob("UserFiles/"+username+"/*.jpeg", function (er, files) {
         
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

exports.afterSignIn = afterSignIn ;
exports.afterRegister = afterRegister;