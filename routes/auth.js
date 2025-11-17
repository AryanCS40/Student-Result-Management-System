const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth');
const {
  hostSignupValidation,
  hostLoginValidation,
  studentSignupValidation,
  studentLoginValidation
} = require("../middlewares/validators");

const { handleValidation } = require("../middlewares/handleValidation");

// <---------------------- HOST AUTHERIZATION ROUTES---------------------------------->

router.get('/host/signup' , AuthController.hostGetSignup);
router.post('/host/signup' ,hostSignupValidation ,handleValidation ,AuthController.hostPostSignup);
router.get('/host/login', AuthController.getHostLogin);
router.post('/host/login' ,hostLoginValidation,handleValidation ,  AuthController.hostpostLogin);
router.get('/host/logout', AuthController.HostLogout);

// <---------------------- STUDENT AUTHERIZATION ROUTES---------------------------------->

router.get('/student/signup', AuthController.studentGetSignup);
router.post('/student/signup',studentSignupValidation ,handleValidation ,AuthController.studentPostSignup);
router.get('/student/login', AuthController.getstudentLogin);
router.post('/student/login',studentLoginValidation, handleValidation ,AuthController.studentpostLogin);
router.get('/student/logout', AuthController.studentLogout);

// <---------------------- UNAUTHERIZED USER ROUTE---------------------------------->
router.get('/', AuthController.index);



module.exports = router;

