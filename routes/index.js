const routes = require('express').Router();
const picture = require('./picture');


routes.use('/pictures', picture);


routes.use('/', require('./swagger'));

module.exports = routes;
