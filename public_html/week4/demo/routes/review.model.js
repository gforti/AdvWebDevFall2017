var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    author: {
        type: String,
        required: [true, 'Author is required']
    },
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