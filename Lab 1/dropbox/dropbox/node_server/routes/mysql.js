var ejs= require('ejs');
var mysql = require('mysql');

//Put your mysql configuration settings - user, password, database and port
function getConnection(){
	var connection = mysql.createConnection({
	    host     : '127.0.0.1',
	    user     : 'root',
	    database : 'test',
	    port	 : '3306'
	});
	
	console.log("Inside get connection");
	return connection;
}


function putData(callback, insertUser){
	
	console.log("inside putdata");
	var connection = getConnection();
    connection.query(insertUser,function(err){
    	   if(err){
    		   console.log("Error : "+ err.message);
    		   callback(err);
    		   
    	   }
    	   else{
    		   callback(err);
    	   }
    });
    console.log("\nConnection closed..");
	connection.end();
    
}


function fetchData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	

exports.putData=putData;
exports.fetchData=fetchData;