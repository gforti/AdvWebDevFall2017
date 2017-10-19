/* GET 'home info' page */


var Review = require('./review.model');

module.exports.home = function(req, res){
    
    var msg = '';
    function successCB(){
         res.render('index', { 
            title: 'home',
            message : 'Review Saved'
        });        
    }
    if (req.method === 'POST') {
        
        Review.create({
          author: req.body.name,
          rating: req.body.rating,
          reviewText: req.body.review
        },function (err) {           
           // saved!
           successCB();
        });
              
    } else {
         res.render('index', { 
            title: 'home',
            message : msg
        });
    }   
    
 
};

module.exports.view = function(req, res){
    
     var id = req.params.id,
         removed = '';
 
    function finish() {     
       Review
       .find()
       .exec(function(err, results){

               res.render('view', { 
                   title: 'View Results',
                   results : results,
                   removed : removed
               });
       });
    }
    
     if ( id ) {         
        Review.remove({ _id: id }, function (err) {
            var result;
            if (!err) {
                 result = ' has been removed'; // success
             } else {
                 result =' has not been removed'; // failure
             }
             removed = id + result;
             finish(); 
        });                           
     } else {
      finish();
    }
     
};


module.exports.update = function(req, res){
    
    var id = req.params.id;
    var msg = '';
    if (req.method === 'POST') {
         
         id = req.body._id;
         var query = { '_id': req.body._id };
         var update = {
          author: req.body.name,
          rating: req.body.rating,
          reviewText: req.body.review
        };
        var options = {};
        var callback = function(){};
        Review.update(query, update, options, callback);
        msg = 'data has been updated';
    }
    
    
    Review
    .findOne({ '_id': id })
    .exec(function(err, results){
    
         if ( results ) {
            res.render('update', { 
                title: 'Update Results',
                message: msg,
                results : results
            });
        } else {
             res.render('notfound', { 
                message: 'Sorry ID not found'
            });
        }
           
    });
};