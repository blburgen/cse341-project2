const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  url: process.env.MONGODB_URI,
};


