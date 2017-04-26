'use strict';

var config = require('../app/config'),
    Promise = require("bluebird"),
    mongodb = require('mongodb'),
    mongoClient = Promise.promisifyAll(mongodb.MongoClient),
    fsp = Promise.promisifyAll(require("fs"));

function seedFile(directory, fileName) {
  var f = fileName.match( /(.*)\.json/ )
  if (f == null) {
      console.log(' Hey '+fileName+', I can just handle json files!');
  }

  var featureName = f[1];
  var data = require('./seeds/' + fileName);
  console.log("Seeding %s data with %d records", featureName, data.length);
  Promise.promisifyAll(mongodb.Collection.prototype);
  return mongoClient.connectAsync(config.connectionString)
  .then(function(db) {
      var col = db.collection(featureName);
      return col.removeAsync().then(function(err){
          return Promise.map(data, function(entry) {
                  return col.updateAsync({_id: entry._id}, entry, { upsert: true })
                  .then(function(res) {
                      return res;
                  })
                  .catch(err => console.log(err));
              });
          });  
      })
}

function seedDir(directory) {
  return fsp.readdirAsync(directory)
    .map(function(fileName) {
      return seedFile(directory, fileName);
    });
}

seedDir('seeding/seeds/').then(function() {
  console.log("seeding done.");
  process.exit(0);
});