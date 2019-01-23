var express = require('express');
const QIX = require('../lib/QIX');
const MUSIC = require('../lib/MUSIC');
const HyperCubeDef = require('../lib/HyperCubeDef');

var router = express.Router();
const qix = new QIX();


/* GET users listing. */
router.get('/', function(req, res, next) {
    qix.openQixEngine()
    .then( result =>{
        console.log("QIX OPENED");
        return ( qix.openDoc('/home/nobody/Qlik/Sense/Apps/Musica.qvf'))
    })
    .then( docId => qix.getHypercube(HyperCubeDef))
    .then( result => res.json(result))

});

module.exports = router;
