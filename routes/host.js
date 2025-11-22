const express = require('express');
const router = express.Router();

const {home} = require('../controllers/host');
const {HPR} = require('../middlewares/isLoggedIn');
const {addResult, postAddResult, viewResult , student_result, delete_result, editResult , postUpdate} = require('../controllers/result')
router.get('/host/home', HPR , home);

router.get('/host/results/add/:studentId', HPR, addResult);
router.post('/host/results/add/:studentId', HPR, postAddResult);
router.get('/host/results/allResult/:studentId', HPR, viewResult);
router.get('/host/result/:studentId/:resultId', HPR , student_result);
router.post('/host/allResult/delete/:resultId/:studentId', HPR , delete_result);
router.get('/host/results/edit/:studentId/:resultId', HPR , editResult );
router.post('/host/results/edit/:resultId/:studentId', HPR , postUpdate );






module.exports = router;