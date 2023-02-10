var express = require('express');
var router = express.Router();

require('../models/connection');
const Tweet = require('../models/tweets');

// GET all tweets

router.get('/', function(req, res) {
    Tweet.find()
    .then(data => {
        if (data) {
            res.json({tweet: data});
        } else {
            res.json({message: 'Twitter is down'});
        }
});
});

// POST a tweet

router.post('/add', function(req, res) {
    const { content } = req.body;
    const tweet = new Tweet({ content });
    tweet.save()
    .then(tweet => {
        res.json({tweet: tweet.content});
    })
    .catch(err => {
        res.json({message: 'Twitter is down'});
    });
});

// DELETE a tweet

router.delete('/del/:id', function(req, res) {
    const { id } = req.params;
    Tweet.findByIdAndDelete(id)
    .then(tweet => {
        res.json({tweet: tweet.content});
    })
    .catch(err => {
        res.json({message: 'Twitter is down'});
    });
});


module.exports = router;