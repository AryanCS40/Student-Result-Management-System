const mongoose =  require('mongoose');

const hostSchema = mongoose.Schema({
    hostName :  String,
    email : String,
    department : String,
    password : String
})

module.exports = mongoose.model("host", hostSchema);