var express = require('express');
var router = express.Router();
var ctrlReviews = require('./review.controller');

// reviews
router.get('/reviews', ctrlReviews.reviewsReadAll);
router.get('/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.post('/reviews', ctrlReviews.reviewsCreate);
router.put('/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);


module.exports = router;
