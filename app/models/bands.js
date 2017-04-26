'use strict';
var joi = require('joi'),
    config = require('../config')

module.exports = function(harvesterApp) {
    harvesterApp.resource('band', {
        name: joi.string().required(),
        links: {
            recorder: { ref: 'recorder', baseUri: config.recorderURI }
        }
    })
};