var ejs = require("ejs");
var mysql = require('./mysql');

function index(req,res) {

	ejs.renderFile('./views/index.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}


function register(req,res) {

	ejs.renderFile('./views/Register.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}


function signin(req,res) {

	ejs.renderFile('./views/signin.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}


function afterSignIn(req,res)
{
	// check user already exists
	var getUser="select * from person where username='"+req.param("inputUsername")+"' and password='" + req.param("inputPassword") +"'";
	console.log("Query is:"+getUser);
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("valid Login");
				res.status(201).send();
				
			      }
			else {    
				
				console.log("Invalid Login");
				res.status(401).send();
			}
		}  
	},getUser);
}

function afterRegister(req,res){
	var insertUser = "Insert into person values('"+req.param("username")+"','"+req.param("firstname")+"','"+req.param("lastname")+"','"+req.param("password")+"','"+
	req.param("email")+"')";
	console.log("The query is :" , insertUser);
	mysql.putData(function(err){
		if(err){
			console.log("error in the callback for after register");
		
			ejs.renderFile('./views/failRegistration.ejs',{error:err ,data1:req.param("username")},function(err, result) {
		        // render on success
		        if (!err) {
		        	     console.log('here');
		            res.end(result);
		        }
		        // render or error
		        else {
		            res.end('An error occurred');
		            console.log(err);
		        }
		    });
			
		
			
		}
		
		else{
			ejs.renderFile('./views/successRegistration.ejs',function(err, result) {
		        // render on success
		        if (!err) {
		            res.end(result);
		        }
		        // render or error
		        else {
		            res.end('An error occurred');
		            console.log(err);
		        }
		    });
			
			
		}
	},insertUser);
	
	
}

function getAllUsers(req,res)
{
	var getAllUsers = "select * from users";
	console.log("Query is:"+getAllUsers);
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				
				var rows = results;
				var jsonString = JSON.stringify(results);
				var jsonParse = JSON.parse(jsonString);
				
				console.log("Results Type: "+(typeof results));
				console.log("Result Element Type:"+(typeof rows[0].emailid));
				console.log("Results Stringify Type:"+(typeof jsonString));
				console.log("Results Parse Type:"+(typeof jsString));
				
				console.log("Results: "+(results));
				console.log("Result Element:"+(rows[0].emailid));
				console.log("Results Stringify:"+(jsonString));
				console.log("Results Parse:"+(jsonParse));
				
				ejs.renderFile('./views/successLogin.ejs',{data:jsonParse},function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
			else {    
				
				console.log("No users found in database");
				ejs.renderFile('./views/failLogin.ejs',function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
		}  
	},getAllUsers);
}
exports.index=index;
exports.signin=signin;
exports.afterSignIn=afterSignIn;
exports.getAllUsers=getAllUsers;
exports.register=register;
exports.afterRegister=afterRegister;