const QIX = require('./QIX');
const MUSIC = require('./MUSIC');

const qix = new QIX();

const music = new MUSIC();

qix.openQixEngine()
.then( result =>{
    console.log("QIX OPENED");
    return ( qix.getEngineVersion() )
})
.then( version =>{
    console.log("version ==> ",version);
    //return (qix.createApp('Musica.qvf'))
})
.then( result =>{
    console.log(result)
    return( qix.getDocList())
})
.then( docList =>{
    console.log(docList);
    return ( qix.openDoc('/home/nobody/Qlik/Sense/Apps/Musica.qvf'))
})
.then ( result =>{
    console.log("Document succesfully opened")
    return (music.getSongsByArtist('111'))
})
.then( artists =>{
    console.log("Lista artisti");
    return (qix.addTable(artists,"Artisti"))
})
.then( result =>{
    console.log("Carco QIX");
    return (qix.reloadApp('Musica'))
})
.then( result =>{
    console.log("App loaded!");
})

.catch( error => console.log("Error => "+error))
