var User    = require('./models/User');
//var glob = require('glob');
var Group = require('./models/Groups')

//*******************************************************************************************************************
function handle_Get_Files(msg, callback) {

    console.log("In handle request for Get Files:" + JSON.stringify(msg));

    const username = msg.username;

  //  var folderPath = "./services/UserFiles/" + username + "/*.*";
    //console.log(folderPath);
    var res = {};
    User.findOne({username:username},{_id:0},function (err,results) {
        if(!err){
          console.log(results);
           // console.log("asdf.asdf")


            res.code = "200";
            res.value = results;
         //   console.log(res.value);
            callback(null,res);
        }


    })

}

//*******************************************************************************************************************

function handle_Get_Groups(msg, callback) {
    console.log("inside get groups function asdf dasf");
     console.log("***************************************");
    var username = msg.username ;
    var res = {}
    console.log(username);


    Group.find({members:username},{_id:0}, function(err,results){

        if(!err){
            console.log("no error while fetching the groupnames");
            console.log(results);
            res.code = "200" ;
            res.value = results;
        }

        else{
            res.code = 401 ;

        }
        console.log("about to give a call back a call");
        console.log(res);
        callback(null,res);
    })

}


//*******************************************************************************************************************
function handle_Add_Member(msg,callback){

    var res = {}
    console.log("******************************");
    console.log("Inside Add member thingy");

    Group.update({"groupname":msg.groupname,"owner":msg.owner}, {"$push": {"members":msg.member}} ,function (err) {
        console.log("After the updateone query");
        if(!err){
            console.log("I am here");
            res.code = "200";
            res.value = "member added";
        }
        else{
            res.code = "400";
            res.value = "Problem adding member";
        }
        callback(null,res);
    })




}


//*******************************************************************************************************************

function handle_Create_Group(msg, callback) {
   // console.log("inside get groups function");
    console.log("***************************************");
    var group = new Group();
    group.owner = msg.username;
    group.groupname = msg.groupname;



    var res = {}

    group.save(function (err) {
        if(!err) {
            Group.update({"groupname": msg.groupname}, {"$push": {members: msg.username}}, function (err) {
                console.log("After the updateone query");
                if (!err) {
                    res.code = "200";
                    res.value = "New Group created";
                    console.log("status 200");
                }
                else {
                    res.code = "402";
                    res.value = "Problem saving files";
                    console.log("status 402");
                }
                callback(null, res);

            })
        }

        else{
            res.code = 403 ;
            res.value = " this is because it couldnt save ";
            console.log("status 403");
            callback(null,res);
        }

    })

}


//*******************************************************************************************************************

function handle_Delete_Group(msg, callback) {
    // console.log("inside get groups function");
    console.log("***************************************");
    var group = new Group();
    group.owner = msg.username;
    group.groupname = msg.groupname;



    var res = {}
    Group.deleteOne({"groupname":msg.groupname,"owner":msg.username} , function (err) {
        if(err){
            console.log("Error while deleting the user , either the user is not the owner of the group");
            res.code = 401;
            res.value = "User not the owner of the group";
        }
        else {
            console.log("Group deleted");
            res.code = "200" ;
            res.value = "Group deleted";
        } callback(null,res);



    })


}


//*******************************************************************************************************************

function handle_Delete_File(msg, callback) {
    // console.log("inside get groups function");
    console.log("***************************************");
      console.log(msg);
    var res = {}
    console.log(msg.file);
    console.log("++++++++++++++++++++++++++++++++++");
    User.updateOne({"username":msg.username},{"$pull": {file:msg.file}}, function(err) {
        if(err){
            console.log("Error while deleting the user , either the user is not the owner of the group");
            res.code = 401;
            res.value = "User not the owner of the group";
        }
        else {
            console.log("file deleted");
            res.code = "200" ;
            res.value = "file deleted";
        } callback(null,res);
    })


}


//*******************************************************************************************************************



exports.handle_Delete_File = handle_Delete_File;
exports.handle_Delete_Group = handle_Delete_Group;
exports.handle_Add_Member = handle_Add_Member;
exports.handle_Create_Group = handle_Create_Group;
exports.handle_Get_Groups = handle_Get_Groups;
exports.handle_Get_Files = handle_Get_Files;

