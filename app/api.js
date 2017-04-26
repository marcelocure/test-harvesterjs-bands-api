'use strict';

var harvester = require('harvesterjs'),
    config = require('./config'),
    options = {
        adapter: 'mongodb',
        connectionString: config.connectionString,
        oplogConnectionString: config.oplogConnectionString
    };

var harvesterApp = harvester(options);

require('./models/bands')(harvesterApp);

harvesterApp.listen(config.port, () => console.log('listening on port ' + config.port)); 