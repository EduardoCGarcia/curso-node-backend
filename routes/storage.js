const express = require("express");
const { createItem, getItems, getItem, deleteItem } = require("../controllers/storage");
const uploadMiddleware = require("../utils/handleStorage");
const validatorGetItem =  require("../vadlidators/storage");
const router = express.Router();

/**
 * Cargar un archivo
 */
//dentro de single va el valor que colocamos en el postman 
router.post("/", uploadMiddleware.single("myfile"), createItem);
/**
 * Obtener una lista de archivos
 */
router.get("/", getItems);
/**
 * Obtener detalles de un archivo
 */
router.get("/:id", validatorGetItem, getItem);
/**
 * Eliminar un Item
 */
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;