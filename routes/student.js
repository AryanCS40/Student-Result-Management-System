const express = require('express');
const router = express.Router();

const {home , AllResult , My_result} = require('../controllers/student');
const {SPR} = require('../middlewares/isLoggedIn')

router.get('/student/home', SPR ,  home);
router.get('/student/checkResult', SPR ,AllResult );
router.get('/student/result/:resultId', SPR ,My_result );





module.exports = router;