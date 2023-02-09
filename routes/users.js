var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

// SIGNUP

router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['firstname', 'username', 'password'])) {
    res.json({ result: false, error: "Il s'agirait de remplir tous les champs enfin !" });
    return;
}

// Check if the user already exists or not

User.findOne({ username: req.body.username }).then(data => {
  if (data === null) {
    const hash = bcrypt.hashSync(req.body.password, 10);

    const newUser = new User({
      firstname: req.body.firstname,
      username: req.body.username,
      password: hash,
      token: uid2(32),
      canTweet: true,
    });

    newUser.save().then(newDoc => {
      res.json({ result: true, message: "Welcome Soldat", data: newDoc, token: newDoc.token });
});
} else {
  // User already exists
  res.json({ result: false, error: "Tu te fous de moi ? Tu as déjà un compte !" });
}
});
});

router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: "Il s'agirait de remplir tous les champs enfin !" });
    return;
}

User.findOne({ username: req.body.username }).then(data => {
  if (data && bcrypt.compareSync(req.body.password, data.password)) {
    res.json({ result: true, message: "Welcome back Champion !", data: data, token: data.token });
  } else {
    res.json({ result: false, error: "Tu te fous de moi ? Soit t'as pas de compte, soit tu t'es planté de password mon salop !" });
  }
});
});

module.exports = router;
