var express = require('express');
var router = express.Router();

/* GET home page. */

router.all('/', function(req, res, next) {
  console.log('all');
  next();
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Gabriel' });
});



router.get('/form', function(req, res, next) {
  res.render('form', { title: 'Gabriel' });
});

router.post('/form', function(req, res, next) {    
  res.render('form', { title: req.body.email });
});



module.exports = router;
