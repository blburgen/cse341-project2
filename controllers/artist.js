const db = require('../models');
const Artist = db.artists;

const apiKey = process.env.apiKey;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  // Create a Artist
  const artist = new Artist({
    artist_id: req.body.artist_id,
    name: req.body.name,
    location: req.body.location,
    year: req.body.year,
  });
  // Save Artist in the database
  if (req.header('apiKey') === apiKey) {
    artist
      .save(artist)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while creating the Artist.',
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

exports.findAll = (req, res) => {
  if (req.header('apiKey') === apiKey) {
    Artist.find(
      {},
      {
        artist_id: 1,
        name: 1,
        location: 1,
        description: 1,
        location: 1,
        _id: 0,
      }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving artists.',
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

// Find a single Artist with an id
exports.findOne = (req, res) => {
  const artist_id = req.params.artist_id;
  if (req.header('apiKey') === apiKey) {
    Artist.find({ artist_id: artist_id })
      .then((data) => {
        if (!data)
          res
            .status(404)
            .send({ message: 'Not found Artist with id ' + artist_id });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving Artist with artist_id=' + artist_id,
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

// // Update a Artist by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const id = req.params.id;

  if (req.header('apiKey') === apiKey) {
    Artist.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Artist with id=${id}. Maybe Artist was not found!`,
          });
        } else res.send({ message: 'Artist was updated successfully.' });
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error updating Artist with id=' + id,
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

// // Delete a Artist with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  if (req.header('apiKey') === apiKey) {
    Artist.findByIdAndRemove(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Artist with id=${id}. Maybe Artist was not found!`,
          });
        } else {
          res.send({
            message: 'Artist was deleted successfully!',
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Could not delete Artist with id=' + id,
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

// // Delete all Artists from the database.
exports.deleteAll = (req, res) => {
  if (req.header('apiKey') === apiKey) {
    Artist.deleteMany({})
      .then((data) => {
        res.send({
          message: `${data.deletedCount} Artists were deleted successfully!`,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while removing all artist.',
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};
