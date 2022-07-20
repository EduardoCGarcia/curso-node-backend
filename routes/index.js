const express =  require("express");
const fs = require("fs");
const router = express.Router();

const PATH_ROUTES = __dirname;//Contante de node que nos da la ruta absoluta del archivo

const removeExtension = (fileName) => {
    //TODO tracks.js [tracks, js]
    //return fileName.split('.').shift();
    return fileName.split('.').shift();
}

//Con fs vamos a leer el directorio de manera asincrona
fs.readdirSync(PATH_ROUTES).filter((file)=>{
    const name = removeExtension(file)//TODO users, storage, tracks
    if  (name!=='index') {
        //La ruta es el nombre del archivo que obtenemos
        //name es el nombre del archivo y completa la ruta
        //file es el nombre del archivo tracks.js 
        router.use(`/${name}`, require(`./${file}`));
    }
});

module.exports=router;