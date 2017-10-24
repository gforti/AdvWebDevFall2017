# Week 4 Guide To MongoDB and Mongoose

## Mongoose Schema

```js
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

> mongoose.model will create the table name `Review` 

## Mongoose CRUD Operations

### Create
```js
var Review = require('../models/review');

Review.create({
        data1: 'data1',
        data2: 'data2',
        data3: 'data3'
    })
    .then(function(){
         debug('Success!');
    })
    .catch(function(){
         debug('Fail!');
    });

```

### Read-All
```js
var Review = require('../models/review');

Review
    .find()
    .exec()
    .then(function(results){
        /* a way to send the results to the view */
        res.render('view', {               
            allResults : results,
        });
    });
```

### Read-One
```js
var Review = require('../models/review');

/* this params needs to be from the request object in express */
 var id = req.params.id;

Review
    .findOne({ '_id': id })
    .exec()
    .then(function(results){
        res.render('update', { 
            message: 'Update Results',
            results : results
        });
    })
    .catch(function(){
        res.render('notfound', { 
            message: 'Sorry ID not found'
        });
    });
```

### Update
```js
var Review = require('../models/review');

var id = req.params.id;
if (req.method === 'POST') {

    id = req.body._id;
    Review
    .findById(id)
    .exec()
    .then(function(reviewData) {        
        reviewData.author = req.body.author;
        reviewData.rating = req.body.rating;
        reviewData.reviewText = req.body.reviewText;

        return reviewData.save();
    })
    .then(function(data){
         debug('Document Updated');
    })
    .catch(function(err){
        debug('Document Not Updated');
    });
}
```

### Delete
```js
var Review = require('../models/review');

var id = req.params.id;

Review.remove({ _id: id })
.then(function(){            
   debug('Document Deleted');
})
.catch(function(err) {            
   debug('Document NOT Deleted');
});     

```
