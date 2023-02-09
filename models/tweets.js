const mongoose = require ('mongoose');

const tweetSchema = new mongoose.Schema({
    content: String,
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;