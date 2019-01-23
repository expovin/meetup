const bluebird = require('bluebird');
const WebSocket = require('ws');
const qixSchema = require('enigma.js/schemas/3.2.json');
//const mixins = require('halyard.js/dist/halyard-enigma-mixin');

const config = {
  Promise: bluebird,
  schema: qixSchema,
  //mixins,
  url: 'ws://localhost:19076/app/engineData',
  createSocket(url) {
    return new WebSocket(url);
  }
};

module.exports = config;