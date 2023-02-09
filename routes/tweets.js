var express = require('express');
var router = express.Router();

require('../models/connection');
const Tweet = require('../models/tweets');
const {checkBody } = require('../modules/checkBody');

// GET all tweets

router.get('/tweets', function(req, res) {
    fetch('http://localhost:3000/tweets')
    .then(response => response.json())
    .then(data => {
        if (data) {
            res.json({tweet: data.content});
        } else {
            res.json({message: 'Twitter is down'});
        }
});
});

// POST a tweet

router.post('/tweets', function(req, res) {
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

router.delete('/tweets/:id', function(req, res) {
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