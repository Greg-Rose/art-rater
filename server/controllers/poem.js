const mongoose = require('mongoose');
const Poem = mongoose.model('Poem');

module.exports.index = (req, res) => {
  Poem.find({}, 'title body', (err, poems) => {
    if (err) { res.send(err); }

    res.json(poems);
  });
};

module.exports.create = (req, res) => {
  let poem = new Poem({
    title: req.body.title,
    body: req.body.body
  });

  poem.save((err) => {
    if (err) { res.send(err); }

    res.json({ message: 'Poem created!' });
  });
};

module.exports.show = (req, res) => {
  Poem.findById(req.params.id, 'title body', (err, poem) => {
    if (err) { res.send(err); }

    if(!poem) {
      return res.status(404).json({
        message: 'Poem not found'
      });
    }

    res.json(poem);
  });
};

module.exports.delete = (req, res) => {
  Poem.findById(req.params.id, (err, poem) => {
    if (err) { res.send(err); }

    if(!poem) {
      return res.status(404).json({
        message: 'Poem not found'
      });
    }

    poem.remove()
      .then(() => {
        res.status(200).json({
          message: 'Poem deleted'
        });
      })
      .catch(err => {
        return res.send(err);
      });
  });
};
