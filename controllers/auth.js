const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword")
const { handleHttpError } = require("../utils/handleError")
const { usersModel } = require("../model")
const { tokenSign, verifyToken } = require("../utils/handleJwt")


/**
 * Este controlador permite crear nuevos usuarios, encriptando su contraseñay obteniendo su hwt
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = { ...req, password: password };
        const dataUser = await usersModel.create(body);
        dataUser.set('password', undefined, { strict: false });

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }


        res.send({ data: data });
    } catch (e) {
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
}
/**
 * Este controlado es el encargado de logear a una persona
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        
        const user = await usersModel.findOne({ email: req.email })
        //.select('password name role email');
        
        if (!user) {
            handleHttpError(res, "USER_NOT_EXIST", 404);
            return;
        }

        const hashPassword = user.get('password');

        const check = await compare(req.password, hashPassword);

        if (!check) {
            handleHttpError(res, "PASSWORD_INVALID", 401);
            return;
        }

        user.set('password', undefined,{strict:false});

        const data = {
            token: await tokenSign(user),
            user
        }

        res.send(data);
    } catch (e) {
        console.log(e);
        handleHttpError(res, "ERROR_LOGIN_USER");
    }
}

module.exports = { registerCtrl, loginCtrl };