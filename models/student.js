const mongoose =  require('mongoose');

const studentSchema = mongoose.Schema({
    name :  String,
    branch : String,
    session : String,
    rollno : String,
    password : String,
    campus : String,
    result: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Result',
      default : []
    }
  ]
});

module.exports = mongoose.model("student", studentSchema);