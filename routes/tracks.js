const express = require("express");
const { getItem, getItems, createItem, updateItem, deleteItem } = require("../controllers/tracks");
const customHeader = require("../middleware/customHeader");
const router = express.Router();
const { validatorCreateItem,validatorGetItem } = require("../vadlidators/tracks")
const authMiddleware =  require("../middleware/sesion");
const checkRole = require("../middleware/rol");

/**
 * Lista los items
 */
router.get("/", authMiddleware,getItems);
/**
 * Obtener un detalle
 */
router.get("/:id", validatorGetItem ,getItem);
/** 
 * Crear los items 
 */
router.post(
    "/", 
    validatorCreateItem, 
    authMiddleware, 
    checkRole(["admin"]), 
    createItem);
/** 
 * Actualizar un Item los items 
 */
router.put ("/:id", validatorGetItem, validatorCreateItem, updateItem);
/** 
 * Eliminar un un Item los items 
 */
router.delete ("/:id", validatorGetItem, deleteItem);

module.exports = router;