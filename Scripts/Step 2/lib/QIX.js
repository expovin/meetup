'use strict'

const enigma = require('enigma.js');
//const Halyard = require('halyard.js');
const enigmaConfig = require('./enigma-config.js');
const enigmaMixin = require('halyard.js/dist/halyard-enigma-mixin.js');

//enigmaConfig.mixins = enigmaMixin;


class QIX {

    constructor() {
        this.appObj=null;
        this.appName=null;
        this.qix=null;
        this.sessionAppName=null;
        
        //this.halyard = new Halyard();
        this.openQixEngine()
        .catch( error =>{
            console.log("General error connecting to QIX engine ",error)
        })
       
    }

    /** STEP 1 OpenEngine, CloseEngine getVersion */

    openQixEngine(){
        return new Promise ( (fulfill, reject) => {
            enigma.create(enigmaConfig)
            .open()
            .then((qix) => {
                this.qix=qix;
                console.log("QIX Engine correctly opened");
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

    /** STEP 2 getDocList, OpenDoc e CloseDoc */

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


}

module.exports = QIX;