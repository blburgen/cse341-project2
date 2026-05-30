const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.pictures = require('./pictures.js')(mongoose);
db.artists = require('./artists.js')(mongoose);

module.exports = db;
