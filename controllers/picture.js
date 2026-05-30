const db = require('../models');
const Picture = db.pictures;

const apiKey =
  'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  // Create a Picture
  const picture = new Picture({
    picture_id: req.body.picture_id,
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
  });
  // Save Picture in the database
  picture
    .save(picture)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Picture.',
      });
    });
};

exports.findAll = (req, res) => {
  console.log(req.header('apiKey'));
  if (req.header('apiKey') === apiKey) {
    Picture.find(
      {},
      {
        picture_id: 1,
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
            err.message || 'Some error occurred while retrieving pictures.',
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

// Find a single Picture with an id
exports.findOne = (req, res) => {
  const picture_id = req.params.picture_id;
  if (req.header('apiKey') === apiKey) {
    Picture.find({ picture_id: picture_id })
      .then((data) => {
        if (!data)
          res
            .status(404)
            .send({ message: 'Not found Picture with id ' + picture_id });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving Picture with picture_id=' + picture_id,
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

// // Update a Picture by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const id = req.params.id;

  Picture.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Picture with id=${id}. Maybe Picture was not found!`,
        });
      } else res.send({ message: 'Picture was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Picture with id=' + id,
      });
    });
};

// // Delete a Picture with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Picture.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Picture with id=${id}. Maybe Picture was not found!`,
        });
      } else {
        res.send({
          message: 'Picture was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Picture with id=' + id,
      });
    });
};

// // Delete all Pictures from the database.
exports.deleteAll = (req, res) => {
  Picture.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Pictures were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all picture.',
      });
    });
};

// Find all published Pictures
exports.findAllPublished = (req, res) => {
  Picture.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving picture.',
      });
    });
};
