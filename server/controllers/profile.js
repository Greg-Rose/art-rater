const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.show = (req, res) => {
  if (!req.user.id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.user.id, 'email')
      .exec((err, user) => {
        res.status(200).json(user);
      });
  }
};
