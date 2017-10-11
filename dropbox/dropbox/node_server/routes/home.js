
 var ejs = require("ejs");
var mysql = require('./mysql');
var fs = require("fs")
var first = "User";
var second = "Table";
var table = first+'_'+second;
function afterRegister(req,res){

console.log(table);

	var insertUser = "Insert into "+table+" values('"+req.param("name")+"','"+req.param("username")+"','"+req.param("email")+"','"+req.param("password")+"')";
	console.log("The query is :" , insertUser);
	mysql.putData(function(err){
		if(err){
			console.log("error in the callback for after register");
               res.status(401);		
 				}
		
		
		else{
               
            fs.mkdir("./UserFiles/" + req.param("username"), function(err) {
		         if (!err) {
			                   console.log("directory created") ;
			                  console.log("checking");
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

var getUser = "Select password from "+table+" where username='"+req.param("username")+"';";
console.log("The query is :", getUser);
mysql.fetchData(function(err){
   if(err){
   	console.log("Error in callback for fetchData");
   	res.status(401) ;
   }

   else{
   	res.status(201).send();
   }


},getUser)


}

exports.afterSignIn = afterSignIn ;
exports.afterRegister = afterRegister;