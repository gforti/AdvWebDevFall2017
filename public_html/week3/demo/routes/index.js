var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var results = [
      { author: 'Daniel', rating: 5, reviewText: 'Great Book', createdOn: '09-09-2000' },
      { author: 'Matt', rating: 3, reviewText: 'Okay Book', createdOn: '05-06-2000' },
      { author: 'Luke', rating: 2, reviewText: 'Boring Book', createdOn: '02-04-2010' }
  ];
  res.render('index', { title: 'Express', results : results });
});

module.exports = router;
