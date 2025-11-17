const jwt = require('jsonwebtoken');
const hostModel =  require('../models/host');
const studentModel = require('../models/student');

exports.HPR = async (req, res, next) => {
    const token = req.cookies.Hosttoken;
    if (!token) {
        req.flash("error", "You Need to Login first");
        return res.redirect('/');
    }
    try {
        const data = jwt.verify(token, process.env.HOST_JWT_KEY);
        const host = await hostModel.findById(data.id);        
        if(!host){
            req.flash("error", "Host Not Found");
            return res.redirect('/host/login'); 
        }
        req.user = host;
        next();
    } catch (err) {
        req.flash("error", "Somethng went wrong");
        return res.redirect('/');
    }
}

exports.SPR = async (req, res, next) => {
    const token = req.cookies.Studenttoken;
    if (!token) {
        req.flash("error", "You Need to Login first");
        return res.redirect('/');
    }
    try {
        const data = jwt.verify(token, process.env.USER_JWT_KEY);
        const student = await studentModel.findById(data.id);
        if(!student){
            req.flash("error", "Student Not Found");
            return res.redirect('/student/login');
        }
        req.user = student;
        next();
    } catch (err) {
        req.flash("error", "Something went Wrong");
        return res.redirect('/');
    }
}


