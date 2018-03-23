const mongoose = require('mongoose');

const PoemSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  body: {
    type: String,
    required: true
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
{
  timestamps: true
});

mongoose.model('Poem', PoemSchema);
