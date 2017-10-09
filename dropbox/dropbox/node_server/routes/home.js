
 var ejs = require("ejs");
var mysql = require('./mysql');
var fs = require("fs")

 function afterRegister(req,res){
var first = "User";
var second = "Table";
var table = first+'_'+second;
console.log(table);

	var insertUser = "Insert into "+table+" values('"+req.param("name")+"','"+req.param("username")+"','"+req.param("email")+"','"+req.param("password")+"')";
	console.log("The query is :" , insertUser);
	mysql.putData(function(err){
		if(err){
			console.log("error in the callback for after register");
               res.status(401);		
 				}
		
		
		else{
            
            fs.mkdir("./" + req.param("username"), function(err) {
		         if (!err) {
			                  // d.createDir(req, res, req.body.dirName, "./files/"
					                //            + req.body.dirName, function(err) {

			                  //               });

			                  console.log("directory created") ;
			                  res.status(201);
			                  

		        }
		         else {
			              return res.end("Dir creation failed : " + err);
			              res.status(401);
		              }
	});
             
		}
	},insertUser);
	
	
}

exports.afterRegister = afterRegister;