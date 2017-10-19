# Week 4 Guide To MongoDB and Mongoose

## Mongoose Schema

```sh
var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    author: String,
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: String,
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

var Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
```

## Mongoose CRUD Operations

### Create
```sh
var Review = require('../models/review');

Review.create({
        data1: 'data1',
        data2: 'data2',
        data3: 'data3'
    },function (err) {           
        /* saved! Callbacks are optional */
        successCB();
    });

function successCB(){
    debug('Success!');
}
```

### Read-All
```sh
var Review = require('../models/review');

Review
    .find()
    .exec(function(err, results){    
        /* a way to send the results to the view */
        res.render('view', {               
            allResults : results,
        });
    });
```

### Read-One
```sh
var Review = require('../models/review');

/* this params needs to be from the request object in express */
 var id = req.params.id;

Review
    .findOne({ '_id': id })
    .exec(function(err, results){
        /* a way to send the results to the view if found */
         if ( results ) {
            res.render('update', { 
                message: 'Update Results',
                results : results
            });
        } else {
             res.render('notfound', { 
                message: 'Sorry ID not found'
            });
        }           
    });
```

### Update
```sh
var Review = require('../models/review');

var id = req.params.id;
if (req.method === 'POST') {

    id = req.body._id;
    var query = { '_id': req.body._id };
    
    var update = {
        data1: req.body.data1,
        data2: req.body.data2,
        data3: req.body.data3
    };
   
   var options = {};
   var callback = function(){};
   
   Review.update(query, update, options, callback);
}
```

### Delete
```sh
var Review = require('../models/review');

var id = req.params.id;

Review.remove({ _id: id }, function(err) {
    if (!err) {
        /* Document Deleted */
    }
    else {
        /* Document NOT Deleted */
    }
});
```
