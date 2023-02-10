const mongoose = require ('mongoose');

const tweetSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    content: String,
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;