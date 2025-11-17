// models/result.js
const mongoose = require('mongoose');

const ResultSubjectSchema = new mongoose.Schema({
  name: { type: String, required: true },         // subject name (from form: subjects[i][name])
  code: { type: String, default: '' },            // optional subject code
  maxMarks: { type: Number, default: 100, min: 0 },
  obtainedMarks: { type: Number, default: 0, min: 0 },
  grade : {type : String, default : ''}
}, { _id: false }); // no separate _id for each subject unless you want it

const ResultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true },
  name: { type: String, required: true },    // denormalized student name
  rollno: { type: String, required: true },  // denormalized rollno
  sem: { type: Number, required: true },
  exam: { type: String, required: true },

  subjects: { type: [ResultSubjectSchema], default: [] },

  total: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },  // stored as 0-100 (float)
  grade: { type: String, default: '' },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'host' },
  createdAt: { type: Date, default: Date.now }
});

// Utility function to compute grade
function computeGrade(percentage) {
  if (percentage >= 75) return 'A';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  if (percentage >= 40) return 'D';
  return 'F';
}



// Pre-save hook: compute total, percentage, grade
ResultSchema.pre('save', function (next) {
  try {
    if (!this.subjects || this.subjects.length === 0) {
      this.total = 0;
      this.percentage = 0;
      this.grade = '';
      return next();
    }

    let totalObtained = 0;
    let totalMax = 0;

    this.subjects.forEach(s => {
      const obtained = Number(s.obtainedMarks || 0);
      const max = Number(s.maxMarks || 0);

      totalObtained += obtained;
      totalMax += max;

    });

    this.total = totalObtained;
    this.percentage = totalMax > 0 ? Number(((totalObtained / totalMax) * 100).toFixed(2)) : 0;
    this.grade = totalMax > 0 ? computeGrade(this.percentage) : '';

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Result', ResultSchema);
