const QIX = require('./QIX');

const qix = new QIX();

qix.openQixEngine()
.then( result =>{
    console.log("QIX OPENED");
    return ( qix.getEngineVersion())
})
.then( version =>{
    console.log("version ==> ",version);
    qix.closeEngine()
})
.catch( error => console.log("Error => "+error))