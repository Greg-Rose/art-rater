const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');

module.exports.register = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    let email = req.body.email.toLowerCase();

    if(err) {
      return res.status(500).json({
        error: err
      });
    } else {
      const user = new User({
        username: req.body.username,
        email: email,
        password: hash
      });

      user.save()
        .then(result => {
          console.log(`Account created: ${email}`);
          let token = user.generateJwt();
          res.status(201).json({
            message: 'Account created',
            token: token
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    }
  });
};

module.exports.login = (req, res) => {
  let email = req.body.email.toLowerCase();
  let failedMessage = 'Login failed, check your email and password';

  User.find({ email: email })
    .exec()
    .then(user => {
      if(user.length < 1) {
        return res.status(401).json({
          message: failedMessage
        });
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if(err) {
          return res.status(401).json({
            message: failedMessage
          });
        }
        if(result) {
          let token = user[0].generateJwt();
          return res.status(200).json({
            message: 'Login successful',
            token: token
          });
        } else {
          return res.status(401).json({
            message: failedMessage
          });
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
