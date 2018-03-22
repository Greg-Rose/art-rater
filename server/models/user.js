const mongoose = require( 'mongoose' );
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [20, 'Username must be 20 or fewer characters long']
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    maxlength: 254
  },
  password: {
    type: String,
    require: true
  }
},
{
  timestamps: true
});

UserSchema.methods.generateJwt = function() {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7 days'
    }
  );
};

mongoose.model('User', UserSchema);
