const mongoose = require('mongoose');
const Poem = mongoose.model('Poem');

module.exports.index = (req, res) => {
  Poem.find({}, 'title body artist createdAt', (err, poems) => {
    if (err) { res.send(err); }

    let response = {
      count: poems.length,
      poems: poems
    };
    res.status(200).json(response);
  }).populate({ path: 'artist', select: 'username' });
};

module.exports.create = (req, res) => {
  let poem = new Poem({
    title: req.body.title,
    body: req.body.body,
    artist: req.user.id
  });

  poem.save((err) => {
    if (err) { res.send(err); }

    Poem.populate(poem, { path: 'artist', select: 'username' }, function(err, poem) {
      res.status(201).json({
        message: 'Poem created!',
        poem: {
          _id: poem.id,
          title: poem.title,
          body: poem.body,
          artist: poem.artist,
          createdAt: poem.createdAt
        }
      });
    });
  });
};

module.exports.show = (req, res) => {
  Poem.findById(req.params.id, 'title body artist createdAt', (err, poem) => {
    if (err) { res.send(err); }

    if(!poem) {
      return res.status(404).json({
        message: 'Poem not found'
      });
    }

    res.status(200).json(poem);
  }).populate({ path: 'artist', select: 'username' });
};

module.exports.delete = (req, res) => {
  Poem.findById(req.params.id, (err, poem) => {
    if (err) { res.send(err); }

    if(!poem) {
      return res.status(404).json({
        message: 'Poem not found'
      });
    }

    if(poem.artist.id === req.user.id) {
      poem.remove()
        .then(() => {
          res.status(200).json({
            message: 'Poem deleted'
          });
        })
        .catch(err => {
          return res.send(err);
        });
    } else {
      return res.status(401).json({
        message: 'UnauthorizedError: You can only delete your own poems'
      });
    }
  }).populate('artist');
};
