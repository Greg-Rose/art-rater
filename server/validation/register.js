const mongoose = require('mongoose');
const User = mongoose.model('User');
const { check, validationResult } = require('express-validator/check');

module.exports.check = [
  check('username')
    .isLength({ min: 3, max: 20 }).withMessage('Username must be 3 to 20 characters long')
    .custom(value => {
      if(value.match(/^[\-\w\.]+$/) === null) {
        throw new Error('Username can only include letters, numbers, "_", "-", and "."');
      } else {
        return value;
      }
    })
    .custom(value => {
      return User.find({ username: new RegExp('^' + value + '$', 'i') }).exec().then(user => {
        if(user.length > 0) {
          throw new Error('Username taken');
        }
      });
    }),

  check('email')
    .isEmail().withMessage('Email must be a valid email address')
    .custom(value => {
      return User.find({ email: value.toLowerCase() }).exec().then(user => {
        if(user.length > 0) {
          throw new Error('Email already in use');
        }
      });
    }),

  check('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .isLength({ max: 255 }).withMessage('Password cannot be more than 255 characters long')
    .custom(value => {
      if(value.match(/^[-\w\$\!]+$/) === null) {
        throw new Error('Password can only include letters, numbers, "_", "-", "!" and, "$"');
      } else {
        return value;
      }
    })
];

module.exports.result = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  } else {
    return next();
  }
};
