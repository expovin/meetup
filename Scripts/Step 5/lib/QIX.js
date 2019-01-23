
const enigmaConfig = require('./enigma-config.js');
const enigma = require('enigma.js');
const enigmaMixin = require('../dist/halyard-enigma-mixin.js');
const Halyard = require('../dist/halyard.js');


if(enigmaConfig.mixins === undefined)
   enigmaConfig.mixins = enigmaMixin;

class QIX {

    constructor() {
        this.appObj=null;
        this.appName=null;
        this.qix=null;
        this.sessionAppName=null;
        
        this.halyard = new Halyard();
        /*
        this.openQixEngine()
        .then( qix => this.qix=qix)
        .catch( error =>{console.log("General error connecting to QIX engine ",error)})
        */
    }

    /** STEP 1 OpenEngine, CloseEngine getVersion */

    openQixEngine(){
        return new Promise ( (fulfill, reject) => {
            enigma.create(enigmaConfig)
            .open()
            .then((qix) => {
                this.qix=qix;
                fulfill(qix);
            }, error => reject(error) );
        })
    }


    closeEngine(){
        return new Promise( (fulfill, reject) => {
            enigma.create(enigmaConfig).close()
            .then( res =>{
                fulfill (res.qComponentVersion);
            }, error => {
                reject(error);
            })
        })
    }
    
    
    getEngineVersion() {
        return new Promise( (fulfill, reject) =>{
            this.qix.engineVersion()
            .then( ver => fulfill(ver))
            .catch( error => {reject(error)})
        })
    }

    /*********************************************** */

    /** STEP 2 getDocList, OpenDoc e CloseDoc *******/

    createApp(appName) {
        return new Promise ( (fulfill, reject) =>{
            this.qix.createApp({qAppName:appName})
            .then( result =>{
                this.appObj=result;
                fulfill("App Created");
            }, error =>{
                reject(error);
            })
        })
    }    

    getDocList() {  
        return new Promise ( (fulfill, reject) =>{
            this.qix.getDocList()
            .then(apps => {
                fulfill(apps);
            })
            .catch( error => {reject(error)})
        })
    }    

    openDoc(appID){
        return new Promise( (fulfill, reject) =>{
            this.qix.openDoc({qDocName:appID})
            .then(qdoc => {
                this.appObj=qdoc;
                fulfill({data:"Doc Opened",appObj:this.appObj});
            }, err => {
                reject(err);
            })
            .catch(error => {
                reject(error);
            })
        })
    }    

    getHypercube(ObjDef){
        return new Promise ( ( fulfill, reject) => {
            this.appObj.createObject(ObjDef)
            .then ( object => object.getLayout() )
            .then ( hypercube => fulfill(hypercube))
        })
    }
 

    closeDoc(){
        return new Promise ( (fulfill, reject) => {
            this.appObj.close()
            .then( (res) =>{
                fulfill({result:"OK", message:"Document succesfully closed"});
            }, err =>{
                reject(err);
            })
        })
    }

    /************************************************** */
    /** STEP 3 HYLARD */

    addTable(data,tableName){ 
        let myTable = new Halyard.Table(data,{name : tableName})
        this.halyard.addTable(myTable);
    }

    reloadApp(appName){
        enigmaConfig.mixins = enigmaMixin;
        return new Promise( ( fulfill, reject) =>{
            this.qix.reloadAppUsingHalyard(appName, this.halyard, false).then((result) => {
                console.log(`App created and reloaded - ${appName}.qvf`);
                process.exit(appName);
              }, (error) => {
                console.log(error);
              });            
        })
    }
}

module.exports = QIX;