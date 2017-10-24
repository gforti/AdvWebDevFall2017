var Review = require('./review.model');
var debug = require('debug')('demo:review');

function sendJSONresponse(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.reviewsReadAll = function(req, res) {
        
    debug('Getting all reviews');
    Review
     .find()
     .exec()
     .then(function(results){
        sendJSONresponse(res, 200, results);
     })
     .catch(function(err){
        sendJSONresponse(res, 404, err);         
     });
    
};

module.exports.reviewsReadOne = function(req, res) {
    
    if (req.params && req.params.reviewid) {
        debug('Getting single review with id =', req.params.reviewid );
        
        Review
        .findById(req.params.reviewid)
        .exec()
        .then(function(results){
            sendJSONresponse(res, 200, results);
        }).catch(function(err){
            sendJSONresponse(res, 404, {
                "message": "reviewid not found"
            });
        });

    } else {
        sendJSONresponse(res, 404, {
            "message": "reviewid not found"
        });
    }
};

/*   POST a new review
 *   /api/v1/reviews 
 */
module.exports.reviewsCreate = function(req, res) {
    
    debug('Creating a review with data ', req.body);
    
    Review.create({
          author: req.body.author,
          rating: req.body.rating,
          reviewText: req.body.reviewText
    })
    .then(function(dataSaved){
        debug(dataSaved);
        sendJSONresponse(res, 201, dataSaved);
    })
    .catch(function(err){ 
        debug(err);
        sendJSONresponse(res, 400, err);
    });
     
};

module.exports.reviewsUpdateOne = function(req, res) {
    
  if ( !req.params.reviewid ) {
    sendJSONresponse(res, 404, {
        "message": "Not found, reviewid is required"
    });
    return;
  }
  
  Review
    .findById(req.params.reviewid)
    .exec()
    .then(function(reviewData) {        
        reviewData.author = req.body.author;
        reviewData.rating = req.body.rating;
        reviewData.reviewText = req.body.reviewText;

        return reviewData.save();
    })
    .then(function(data){
        sendJSONresponse(res, 200, data);
    })
    .catch(function(err){
        sendJSONresponse(res, 400, err);
    });
        
};

module.exports.reviewsDeleteOne = function(req, res) {
  if ( !req.params.reviewid ) {
    sendJSONresponse(res, 404, {
        "message": "Not found, reviewid is required"
    });
    return;
  }
  
  Review
    .findByIdAndRemove(req.params.reviewid)
    .exec()
    .then(function(data){
        debug("Review id " + req.params.reviewid + " deleted");
        debug(data);
        sendJSONresponse(res, 204, null);
    })
    .catch(function(err){
        sendJSONresponse(res, 404, err);
    });
    
};