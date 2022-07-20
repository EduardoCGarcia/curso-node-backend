 const { storageModel } = require("../model");
const { handleHttpError } =  require("../utils/handleError");
const { matchedData } = require("express-validator"); 
const fs = require("fs");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`

/**
 * Obtener la lista de datos de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async(req, res) => {
    try{
        const data = await storageModel.find({});
        res.send({data});
    }catch(e){
        console.log(e);
        handleHttpError(res,"ERROR_GET_ITEMS")
    }
};

/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem =  async(req, res) => {
    try{
        req  = matchedData(req);
        const {id} = req;
        
        const data = await storageModel.findById(id);
         
        res.send({data});
    }catch(e){
        handleHttpError(res,"ERROR_GET_ITEM")
    }
};

/**
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */

const  createItem =  async (req, res) => {
    try{
        const { file } = req;
        
        const fileData = {
            filename: file.filename,
            url:`${PUBLIC_URL}/${file.filename}`
        }
        
        const data =  await storageModel.create(fileData);
        //Los controladores siempre deben retornar algo de lo contrario lse queda colgada la aplicación
        res.send({data});
    }catch(e){
        handleHttpError(res,"ERROR_CREATE_ITEM");
    }
};


/**
 * Eliminar un registro 
 * El dato se esta eliminando fisicamente tanto de la base de datos como del storage
 * En caso de querer cambiar eso no se ejecuta el fs y el deleteOne cambia por delete 
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem =  async(req, res) => {
    try{
        const { id } = matchedData(req);
        const dataFile = await storageModel.findById(id);
        await storageModel.deleteOne({_id:id});
        await storageModel.delete({_id:id});
        const { filename } = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`;
        
        //fs.unlinkSync(filePath);

        const data = {
            filePath,
            deleted: 1
        }

        res.send({data});
    }catch(e){
        handleHttpError(res,"ERROR_DELETE_ITEM")
    }
};


module.exports = {getItems,getItem,createItem,deleteItem};