const mongoose = require("mongoose");

const data_path = "mongodb+srv://root:root@project.rb5yi4k.mongodb.net/SRMS?retryWrites=true&w=majority&appName=Project"

mongoose.connect(data_path).then(function(){
    console.log('connected');
    console.log(`Server is runnning on http://localhost:3000`);
}).catch(function(err){
    console.log(err);
})

module.exports = mongoose.connection;