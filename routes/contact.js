var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.session.username)
  if(req.session.username===undefined){
    res.redirect('/login')
  }else
  res.render('contact');
  next()
});

module.exports = router;
