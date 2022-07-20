const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const pathStorage = `${__dirname}/../storage`;
        cb(null, pathStorage);   
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split(".").pop();//Toma el ultimo valor del array es decir la extencion
        //basicamente esto es para asignarle un nombre al archivo
        const filename = `file-${Date.now()}.${ext}`;// hasta now es una forma de que nos devuelva la marca de tiempo actual en formato UNIX 
        console.log(filename);
        cb(null,filename);
    }
});

const uploadMiddleware =  multer({storage});

module.exports = uploadMiddleware;