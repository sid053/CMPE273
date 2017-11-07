var User    = require('./models/User');
//var glob = require('glob');


function handle_Get_Files(msg, callback) {

    console.log("In handle request for Get Files:" + JSON.stringify(msg));

    const username = msg.username;

    var folderPath = "./services/UserFiles/" + username + "/*.*";
    //console.log(folderPath);
    var res = {};
    User.findOne({username:"sid"},{_id:0},function (err,results) {
        if(!err){
            console.log(results);
           // console.log("asdf.asdf")


            res.code = "200";
            res.value = results;
            console.log(res.value);
            callback(null,res);
        }


    })

}





exports.handle_Get_Files = handle_Get_Files;

