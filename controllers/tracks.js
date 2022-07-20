const { tracksModel } = require("../model");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator"); 
/**
 * Obtener la lista de datos de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async(req, res) => {
    try{
        const user =  req.user;
        const data = await tracksModel.findAllData({});
        res.send({data, user});
    }catch(e){
        console.log(e)
        handleHttpError(res,"ERROR_GET_ITEMS");
    }
};

/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async(req, res) => {
    try{
        req  = matchedData(req);
        const {id} = req;
        
        const data = await tracksModel.findOneData(id);
         
        res.send({data});
    }catch(e){
        console.log(e)
        handleHttpError(res,"ERROR_GET_ITEM")
    }
};

/**
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */

const createItem =  async (req, res) => { 
    //Los controladores siempre deben retornar algo de lo contrario lse queda colgada la aplicación
    //Restructuración de JavaScript
    // const body =  req.body =====const { body } = req;
    
    try{
        const body  = matchedData(req);
        const data = await tracksModel.create(body);

        res.send({data});
    }catch(e){
        handleHttpError(res,"ERROR_CREATE_ITEM")
    }
    
};

/**
 * Atualizar un registro
 * @param {*} req 
 * @param {*} res 
 */
const updateItem =  async(req, res) => {
    try{
        const {id, ...body}  = matchedData(req);
        const data = await tracksModel.findOneAndUpdate(id, body);
  
        res.send({data});
    }catch(e){
        handleHttpError(res,"ERROR_UPDATE_ITEM")
    }
};
/**
 * Eliminar un registro 
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem =  async(req, res) => {
    try{
        req  = matchedData(req);
        const { id } = req;
        
        const data = await tracksModel.delete({_id:id});
         
        res.send({data});
    }catch(e){
        console.log(e);
        handleHttpError(res,"ERROR_DELETE_ITEM")
    } 
}; 


module.exports = {getItems,getItem,createItem,updateItem,deleteItem};