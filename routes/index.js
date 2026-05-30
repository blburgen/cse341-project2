const routes = require('express').Router();
const picture = require('./picture');
const artist = require('./artist');


routes.use('/pictures', picture);
routes.use('/artists', artist);


routes.use('/', require('./swagger'));

module.exports = routes;
