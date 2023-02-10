const mongoose = require ('mongoose');

const tweetSchema = new mongoose.Schema({
    firstname: String,
    username: String,
    content: String,
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;