const express =  require("express");
const router =  express.Router();
const { validatorRegister, validatorLogin } = require("../vadlidators/auth");
const {registerCtrl, loginCtrl} =  require("../controllers/auth");

/**
 * Crear un registro
 * 
 * Login, Register
 */
router.post("/register", validatorRegister, registerCtrl);

router.post("/login", validatorLogin, loginCtrl);


module.exports =  router;