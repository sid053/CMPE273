var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

//mongoose.connect('mongodb://127.0.0.1:27017/cmpe_273');

var groupSchema   = new Schema({
    groupname:String,
    owner:String,
    members:Array,
    file:Array,
    folder:Array
});

module.exports = mongoose.model('Groups', groupSchema);
