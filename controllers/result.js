const mongoose = require('mongoose');
const Student = require('../models/student');
const Host = require('../models/host');
const Result = require('../models/result');

exports.viewResult = async (req, res) => {
  try {
    const hostId = req.user._id;    
            const host = await Host.findById(hostId).lean();        
            if (!host){
              req.flash("error", "Host Not Found");
              return res.redirect('/');
            } 

    const studentId = req.params.studentId;
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).send('Invalid student id');
    }

    // 1) Get student (so view can show student name/info)
    const student = await Student.findById(studentId).lean();
    if (!student) return res.status(404).send('Student not found');

    // 2) Find results for this student. Populate creator if you want (optional)
    const results = await Result.find({ student: studentId })
      .sort({ createdAt: -1 }).lean();
    const success = req.flash('success');

    res.render('host/results/allResult', {
      results,
      student,
      studentId,
      pageTitle: 'View Result',
      role: 'host',
      success,
      host
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


exports.addResult = async (req, res) => {
  try {
    const hostId = req.user._id;    
            const host = await Host.findById(hostId).lean();        
            if (!host){
              req.flash("error", "Host Not Found");
              return res.redirect('/');
            } 

    const studentId = req.params.studentId;
    if (!mongoose.Types.ObjectId.isValid(studentId)) return res.status(400).send('Invalid student id');

    const student = await Student.findById(studentId).lean();
    if (!student) return res.status(404).send('Student not found');

    res.render('host/results/add', {pageTitle : "Result", role : "host" ,  student, host }); // pass student to view
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.postAddResult = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).send('Student not found');

    // Parse subjects from form
    const subjectsData = Array.isArray(req.body.subjects)
      ? req.body.subjects
      : Object.values(req.body.subjects || {});

    const subjects = subjectsData.map(s => ({
      name: s.name,
      code: s.code || '',
      maxMarks: Number(s.maxMarks) || 100,
      obtainedMarks: Number(s.obtainedMarks) || 0,
    }));

    // Create Result — the model’s pre-save hook will compute total, percentage, grade automatically
    const newResult = new Result({
      student: student._id,
      name: student.name,
      rollno: student.rollno,
      sem: req.body.sem,
      exam: req.body.exam,
      subjects,
    });

    await newResult.save(); // 🔹 total, percentage, grade auto-calculated
    student.result.push(newResult._id);
    await student.save();
    req.flash('success', `${student.name}'s Resut has been Created`);
    return res.redirect(`/host/results/allResult/${student._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.student_result = async (req,res)=>{
 const result_id =  req.params.resultId;
 const result = await Result.findById(result_id).lean();
const hostId = req.user._id;
const host = await Host.findById(hostId).lean(); 
res.render("host/result", {pageTitle : 'Document', role : 'host', result, host});
}

exports.editResult = async (req,res)=>{
  const result_id = req.params.resultId;
  const result = await Result.findById(result_id).lean();
  const studentId = req.params.studentId;
  const student = await Student.findById(studentId).lean();
  const hostId = req.user._id;
const host = await Host.findById(hostId).lean(); 

 

  res.render('host/results/edit', {pageTitle : 'Edit Result', role : 'host', result, student,host})
};

exports.postUpdate = async (req, res) => {
  try {
    const student_id = req.params.studentId;
    const student = await Student.findById(student_id);

    // Extract subjects safely
    const subjectsData = Array.isArray(req.body.subjects)
      ? req.body.subjects
      : Object.values(req.body.subjects || {});

    const subjects = subjectsData.map(s => ({
      name: s.name,
      code: s.code || '',
      maxMarks: Number(s.maxMarks) || 0,
      obtainedMarks: Number(s.obtainedMarks) || 0
    }));

    // -----------------------------
    // 1️⃣ Calculate TOTAL & MAX
    // -----------------------------
    let totalObtained = 0;
    let totalMax = 0;

    subjects.forEach(sub => {
      totalObtained += Number(sub.obtainedMarks || 0);
      totalMax += Number(sub.maxMarks || 0);
    });

    // -----------------------------
    // 2️⃣ Calculate PERCENTAGE
    // -----------------------------
    const percentage =
      totalMax > 0 ? Number(((totalObtained / totalMax) * 100).toFixed(2)) : 0;

    // -----------------------------
    // 3️⃣ Calculate GRADE
    // -----------------------------
    function computeGrade(p) {
      if (p >= 75) return "A";
      if (p >= 60) return "B";
      if (p >= 50) return "C";
      if (p >= 40) return "D";
      return "F";
    }

    const grade = computeGrade(percentage);

    // -----------------------------
    // 4️⃣ Update result
    // -----------------------------
    const result = await Result.findOneAndUpdate(
      { _id: req.params.resultId },
      {
        student: student._id,
        name: student.name,
        rollno: student.rollno,
        subjects,
        total: totalObtained,
        percentage,
        grade
      },
      { new: true }
    );

    // Flash success message
    req.flash(
      "success",
      `${result.sem} Sem Result Updated Successfully!`
    );

    return res.redirect(`/host/results/allResult/${student_id}`);

  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong while updating result");
    return res.redirect(`/host/home`);
  }
};



// controllers/host.js
exports.delete_result = async (req, res) => {
  try {
    const { resultId, studentId } = req.params; // resultId and student should come from the route

    // find the result (optional, but used to create flash message)
    const result = await Result.findById(resultId);
    if (!result) {
      req.flash('error', 'Result not found');
      return res.redirect('back');
    }

    // delete by id (pass the id, not the document)
    await Result.findByIdAndDelete(resultId);
    
    req.flash('success', `${result.sem} Semester Result has been deleted successfully`);
    return res.redirect(`/host/results/allResult/${studentId}`);
  } catch (err) {
    console.error(err);
    req.flash('error', 'Delete failed');
    return res.redirect('back');
  }
};
