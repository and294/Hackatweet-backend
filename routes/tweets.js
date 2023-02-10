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
    const { firstname, username, content } = req.body;

    console.log(req.body);
    const tweet = new Tweet({ firstname, username, content });
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
    Tweet.deleteOne({id})
    .then(tweet => {
        res.json(tweet);
    })
    .catch(err => {
        res.json({message: 'Twitter is down'});
    });
});


module.exports = router;