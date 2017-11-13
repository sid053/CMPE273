var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var files = require('./services/files')
var topic_1 = 'login';
var topic_2 = 'validate';
//var topic_3 = 'getFiles_topic';

var consumer = connection.getConsumer();
//var consumerValidate = connection.getConsumer(topic_2);
//var consumerGetFiles = connection.getConsumer(topic_3);
var producer = connection.getProducer();
//var producerValidate = connection.getProducer();
//var producerGetFiles = connection.getProducer();






console.log('server is running');



consumer.on('message', function (message) {
   // console.log('message received');
    //console.log(JSON.stringify(message.topic));
    var data = JSON.parse(message.value);


switch(message.topic) {

    case 'login':

        login.handle_Login_request(data.data, function (err, res) {
         //   console.log('after handle' + res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            // console.log("here I am");
            // console.log(payloads);
            // console.log("about to send response");
            producer.send(payloads, function (err, data) {

                console.log(data);
                console.log("After the data is sent");
            });
            return;
        });

        break;

    //*******************************************************************************************************************

    case 'validate' :

        login.handle_Validate_request(data.data, function (err, res) {
            // console.log("After processing the data");
            // console.log(res.code + "  " + res.value);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            // console.log("after the payload is formed");
            // console.log(payloads);
            // console.log("about to send response");
            producer.send(payloads, function (err, data) {
                //console.log(data);
            });
            return;

        });

        break;

    //*******************************************************************************************************************


    case 'files':
        files.handle_Get_Files(data.data, function (err, res) {
          //  console.log("After processing the data");
            // console.log(res.file+"  ");
            //   var files = "Empty";
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            // console.log("after the payload is formed");
            // // console.log(payloads);
            // console.log("about to send response");
            producer.send(payloads, function (err, data) {
                //   console.log(data);
            });
            return;
        });
        break;

    //*******************************************************************************************************************

    case 'signUp':
        login.handle_SignUp_request(data.data, function (err, res) {
           // console.log('after handle' + res.code);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            // console.log("here I am");
            // console.log(payloads);
            // console.log("about to send response");
            producer.send(payloads, function (err, data) {

                // console.log(data);
                // console.log("After the data is sent");
            });
            return;
        });

        break;

    //*******************************************************************************************************************

    case 'fileUpload' :

        login.file_Upload(data.data, function (err, res) {
         //   console.log('after handle' + res.code);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            // console.log("here I am");
            // console.log(payloads);
            // console.log("about to send response");
            producer.send(payloads, function (err, data) {

                // console.log(data);
                // console.log("After the data is sent");
            });
            return;
        });
        break;

    //*******************************************************************************************************************

    case 'uploadFolder':
        login.handle_Folder_upload(data.data, function (err, res) {
            console.log("inside the upload folder function");
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {

                console.log(data);
                console.log("After the data is sent");
            });
            return;
        });
        break;

    //*******************************************************************************************************************

    case 'deleteFolder':
        login.handle_Folder_delete(data.data, function (err, res) {
        //    console.log("inside the upload folder function");
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {

              //  console.log(data);
                //console.log("After the data is sent");
            });
            return;
        });
        break;

    //*******************************************************************************************************************

    case 'deleteFile':
        files.handle_Delete_File(data.data , function(err,res){
           // console.log("inside the delete file function");
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
//                console.log(data);
//                 console.log("After the data is sent");
//                 console.log("***************************************");
             });
            return;

        });
      break;

    //*******************************************************************************************************************
    case 'groups':
        if(data.data.action==="getGroups") {
            files.handle_Get_Groups(data.data, function (err, res) {
               // console.log("inside the get Groups function");
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                   // console.log("***************************************");
                    //console.log(data);
                    //console.log("After the data is sent");
                    //console.log("***************************************");
                });
                return;
            });
        }

        //*******************************************************************************************************************

       else if(data.data.action==='create') {
        files.handle_Create_Group(data.data, function (err, res) {
            //console.log("inside creation of group");
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
             //   console.log(payloads);
            producer.send(payloads, function (err, data) {
                // console.log("***************************************");
                // console.log(data);
                // console.log("After the data is sent");
                // console.log("***************************************");
            });
            return;
        });
   }


        //*******************************************************************************************************************


   else if (data.data.action ==='addMember'){

            files.handle_Add_Member(data.data, function (err, res) {
                console.log("inside creation of group");
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                console.log(payloads);
                producer.send(payloads, function (err, data) {
                    // console.log("***************************************");
                    // console.log(data);
                    // console.log("After the data is sent");
                    // console.log("***************************************");
                });
                return;
            });

        }


    //*******************************************************************************************************************

    else if (data.data.action ==='deleteGroup'){

        files.handle_Delete_Group(data.data, function (err, res) {
            //console.log("inside creation of group");
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            // console.log("---------------------------------------------");
            // console.log(payloads);
            producer.send(payloads, function (err, data) {
                // console.log("***************************************");
                // console.log(data);
                // console.log("After the data is sent");
                // console.log("***************************************");
            });
            return;
        });

    }
        break;


    //*******************************************************************************************************************

    default:
     //   console.log("inside the default thingy");
        break;

}


});



