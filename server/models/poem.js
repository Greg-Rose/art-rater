const mongoose = require('mongoose');

const PoemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
},
{
  timestamps: true
});

mongoose.model('Poem', PoemSchema);
