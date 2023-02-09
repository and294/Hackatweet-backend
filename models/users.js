const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: String,
    username: String,
    password: String,
    token: String,
    canTweet: Boolean,
});

const User = mongoose.model('Users', userSchema);

module.exports = User;