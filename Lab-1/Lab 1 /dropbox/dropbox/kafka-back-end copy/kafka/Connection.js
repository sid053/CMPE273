var kafka = require('kafka-node');

function ConnectionProvider() {
    this.getConsumer = function() {
       // console.log(topic_name);

            this.client = new kafka.Client("localhost:2181");

            this.kafkaConsumerConnection = new kafka.Consumer(this.client,[ { topic: 'login', partition: 0 },
                {topic:'validate', partition:0},{topic:'files',partition:0},{topic:'signUp',partition:0},
                {topic:'uploadFiles',partition:0}]);

            this.client.on('ready', function () { console.log('client ready!')

             //console.log("Consumer ready for topic : " + topic_name)
                })


        return this.kafkaConsumerConnection;
    };

    //Code will be executed when we start Producer
    this.getProducer = function() {
        if (!this.kafkaProducerConnection) {
            this.client = new kafka.Client("localhost:2181");
            var HighLevelProducer = kafka.HighLevelProducer;
            this.kafkaProducerConnection = new HighLevelProducer(this.client);
            //this.kafkaConnection = new kafka.Producer(this.client);
            console.log('producer ready');
        }
        return this.kafkaProducerConnection;
    };
}
exports = module.exports = new ConnectionProvider;