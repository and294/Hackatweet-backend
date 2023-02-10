const mongoose = require ('mongoose');

const tweetSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    content: String,
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;