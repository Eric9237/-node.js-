var express = require('express');
var router = express.Router();
const db = require('../sql')

/* home page. */
router.get('/', function (req, res, next) {
  res.render('main');
});
/* login page. */
router.get('/login', function (req, res, next) {
  res.render('index');
});

router.post('/login', function (req, res, next) {
  const sqlStr = 'select * from 01_users where username = ? and password = ?'

  db.query(sqlStr, [req.body.userName, req.body.userPwd], (err, results) => {
    // console.log(req.body.userName)
    // console.log(req.body.userPwd)


    if (err) { return res.cc(err) }
    if (results.length !== 1) { return res.cc('登入失敗') }


    res.render('main')
  })


});



module.exports = router;

