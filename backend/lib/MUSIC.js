'use strict'

const https = require('https');
const url="musicdemons.com";

var options = {
    host: url,
    port: 443,
    path: '/',
    method: 'GET'
};

class MUSIC {

    constructor(){}

    getArtists(){
        options.path="/api/v1/artist";
        return new Promise ( (fulfill, reject) =>{

            https.request(options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                  fulfill(JSON.parse(chunk));
                });
              })
              .on( 'error', e =>{
                  reject(e);
              })
              .end();   
        })
    }

    getSongsByArtist(artistId){
        options.path="/api/v1/artist/"+artistId+"/songs";
        return new Promise ( (fulfill, reject) =>{

            https.request(options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                  fulfill(JSON.parse(chunk));
                });
              })
              .on( 'error', e =>{
                  reject(e);
              })
              .end();   
        })        

    }

}

module.exports = MUSIC;