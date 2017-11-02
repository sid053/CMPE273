var User    = require('./models/User');
var glob = require('glob');


function handle_Get_Files(msg, callback) {

    console.log("In handle request for Get Files:" + JSON.stringify(msg));

    const username = msg.username;

    var folderPath = "./services/UserFiles/" + username + "/*.*";
    console.log(folderPath);
    var res = {};
    User.find({username:"sid"},function (err,results) {
        if(!err){
            console.log(results);
        }
        callback(null,results);

    })

}





exports.handle_Get_Files = handle_Get_Files;

