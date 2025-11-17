const mongoose = require("mongoose");

const data_path = process.env.MONGO_URI

mongoose.connect(data_path).then(function(){
    console.log('connected');
    console.log(`Server is runnning on http://localhost:3000`);
}).catch(function(err){
    console.log(err);
})

module.exports = mongoose.connection;