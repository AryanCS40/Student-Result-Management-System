const bcrypt = require('bcrypt');
const hostModel = require('../models/host');
const studentModel = require('../models/student');
const Token = require('../utils/generateToken');

// ------------------------------------ INDEX ------------------------------------
exports.index = (req, res) => {
    let error = req.flash("error");
    res.render('index', { pageTitle: 'index', error, role: "none" });
};


// ========================== HOST AUTH =========================================

// ---------- HOST SIGNUP ----------
exports.hostGetSignup = (req, res) => {
    let error = req.flash("error");
    res.render('host/signup', { pageTitle: 'Signup', error, role: "host" });
};

exports.hostPostSignup = async (req, res) => {
    let { hostName, department, email, password } = req.body;

    // Only DB check (express-validator already validated all fields)
    let host = await hostModel.findOne({ email });
    if (host) {
        req.flash("error", "User already exist");
        return res.redirect('signup');
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let newHost = await hostModel.create({
                hostName,
                department,
                email,
                password: hash
            });

            let Hosttoken = Token.HostgenerateToken(newHost);
            res.cookie("Hosttoken", Hosttoken);
            res.redirect('home');
        });
    });
};


// ---------- HOST LOGIN ----------
exports.getHostLogin = (req, res) => {
    let error = req.flash("error");
    res.render('host/login', { pageTitle: 'LoginPage', error, role: "host" });
};

exports.hostpostLogin = async (req, res) => {
    let { email, password } = req.body;

    let host = await hostModel.findOne({ email });

    // express-validator already checked if fields are empty
    if (!host) {
        req.flash("error", "Email or password is incorrect");
        return res.redirect('login');
    }

    bcrypt.compare(password, host.password, (err, result) => {
        if (result) {
            let Hosttoken = Token.HostgenerateToken(host);
            res.cookie("Hosttoken", Hosttoken);
            res.redirect('home');
        } else {
            req.flash("error", "Email or password is incorrect");
            return res.redirect('login');
        }
    });
};


// ---------- HOST LOGOUT ----------
exports.HostLogout = (req, res) => {
    res.clearCookie("Hosttoken");
    res.redirect('/');
};



// ========================== STUDENT AUTH =========================================

// -------- STUDENT SIGNUP --------
exports.studentGetSignup = (req, res) => {
    let error = req.flash('error');
    res.render('student/signup', { pageTitle: 'Signup', error, role: "student" });
};

exports.studentPostSignup = async (req, res) => {
    let { name, branch, session, rollno, password, campus, result } = req.body;

    // Check if student already exists
    let student = await studentModel.findOne({ rollno });
    if (student) {
        req.flash("error", "User already exist");
        return res.redirect('/student/signup');
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let newStudent = await studentModel.create({
                name,
                branch,
                session,
                rollno,
                password: hash,
                campus,
                result
            });

            let Studenttoken = Token.UsergenerateToken(newStudent);
            res.cookie("Studenttoken", Studenttoken);
            res.redirect('/student/home');
        });
    });
};


// -------- STUDENT LOGIN --------
exports.getstudentLogin = (req, res) => {
    let error = req.flash("error");
    let success = req.flash("success");
    res.render('student/login', { pageTitle: "LoginPage", error, success, role: "student" });
};

exports.studentpostLogin = async (req, res) => {
    let { rollno, password } = req.body;

    let student = await studentModel.findOne({ rollno });

    if (!student) {
        req.flash("error", "Rollno. or password is Incorrect");
        return res.redirect('/student/login');
    }

    bcrypt.compare(password, student.password, (err, result) => {
        if (result) {
            let Studenttoken = Token.UsergenerateToken(student);

            res.cookie("Studenttoken", Studenttoken, {
                httpOnly: true,
                sameSite: 'lax',
                path: '/'
            });

            req.flash("success", "Student Logged in successfully");
            res.redirect('/student/home');

        } else {
            req.flash("error", "Rollno. or password is incorrect");
            return res.redirect('/student/login');
        }
    });
};


// ------------ STUDENT LOGOUT ------------
exports.studentLogout = (req, res) => {
    res.clearCookie("Studenttoken", { path: '/' });
    res.redirect('/');
};
