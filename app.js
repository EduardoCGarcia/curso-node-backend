require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morganBody = require("morgan-body");
const loggerStream =  require("./utils/handleLogger");

//llamamos a la conexion a la base de datos
const dbConnectNoSql = require('./config/mongo');
const {dbConnectMySql} = require("./config/mysql")

const ENGINE_DB =  process.env.ENGINE_DB;

const app = express();

app.use(cors());
app.use(express.json());
/**
 * hacer uso de static para que los recursos publicos/ 
 * estaticos los saque de la carpeta storage
 */
app.use(express.static("storage"));

//declaramos la contante que hara la conexion con slack

morganBody(app, {
    noColors:true,
    stream:loggerStream,
    skip:function (req,res) {
        return res.statusCode < 400
    }
})




const port = process.env.PORT || 3000;


app.use("/api", require('./routes'));//De esta forma hacemos referencia de manera directa al index 

//Definimos por que puerto va a estar escuchando
app.listen(port, () => {
    console.log('Tu app esta lista por http://localhost:' + port);
});

(ENGINE_DB === 'nosql') ? dbConnectNoSql() : dbConnectMySql()

