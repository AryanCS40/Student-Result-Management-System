const Student = require('../models/student');
const Result = require('../models/result');

// controllers/student.js
exports.home = async (req, res) => {
  try {
    const studentId = req.user._id;    
    const student = await Student.findById(studentId).lean();
    if (!student){
      req.flash("error", "Student Not Found");
      return res.redirect('/');
    } 
    const success = req.flash('success');
    const error = req.flash("error");
    return res.render('student/home', { pageTitle: 'Home', role: 'student', success, student, error});
  } catch (err) {
    console.error('student.home error:', err);
    return res.status(500).send('Server error');
  }
};


// GET - logged-in student's results (recommended)
// controllers/student.js
exports.AllResult = async (req, res) => {
  try {
    const studentId = req.user._id; // req.user is set by middleware
    const student = await Student.findById(studentId).lean();
    const results = await Result.find({ student: studentId }).lean();

    if (!results || results.length === 0) {
      return res.render("student/checkResult", {
        pageTitle: "Result",
        role: "student",
        student,
        results: [],
        message: "No result found",
      });
    }

    res.render("student/checkResult", {
      pageTitle: "Result Dashboard",
      role: "student",
      student,
      results,
    });
  } catch (err) {
    console.error("getResult error:", err);
    res.status(500).send("Server error");
  }
};

exports.My_result = async (req,res)=>{
 const result_id =  req.params.resultId;
 const result = await Result.findById(result_id).lean();
const studentId = req.user._id;
const student = await Student.findById(studentId).lean(); 
res.render("student/result", {pageTitle : 'Document', role : 'student', result, student});
}





