const routes = require('express').Router();
const pictures = require('../controllers/picture.js');

routes.get('/', pictures.findAll);

routes.get('/:picture_id', pictures.findOne);

routes.post('/', pictures.create);

routes.put('/:id', pictures.update);

routes.delete('/:id', pictures.delete);

routes.delete('/', pictures.deleteAll);

module.exports = routes;
