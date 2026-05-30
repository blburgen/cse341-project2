const routes = require('express').Router();
const artists = require('../controllers/artist.js');

routes.get('/', artists.findAll);

routes.get('/:artist_id', artists.findOne);

routes.post('/', artists.create);

routes.put('/:id', artists.update);

routes.delete('/:id', artists.delete);

routes.delete('/', artists.deleteAll);

module.exports = routes;
