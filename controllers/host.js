const Student = require('../models/student');
const Host = require('../models/host');

exports.home = async (req, res) => {
  try {
    const hostId = req.user._id;    
        const host = await Host.findById(hostId).lean();        
        if (!host){
          req.flash("error", "Host Not Found");
          return res.redirect('/');
        } 
    // Fetch all students
    const students = await Student.find().lean();

    // Render the host home page and pass student data
    res.render('host/home', {
      pageTitle: 'Host Dashboard',
      students,
      role : "host",
      host
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};










