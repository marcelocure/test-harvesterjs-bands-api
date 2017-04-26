'use strict';
var config = {};

config.connectionString = 'mongodb://127.0.0.1:27017/test-es';
config.oplogConnectionString =  'mongodb://127.0.0.1:27017/local';
config.port = process.env.PORT || 3000;
config.recorderURI = 'http://localhost:4567';
module.exports = config;
