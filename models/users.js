const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: String,
    username: String,
    password: String,
    token: String,
});

const User = mongoose.model('Users', userSchema);

module.exports = User;