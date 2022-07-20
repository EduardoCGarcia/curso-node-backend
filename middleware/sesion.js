const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { usersModel } = require("../model");
const getProperties =  require("../utils/handlePropertiesEngine");
const propertiesKey =  getProperties();

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleHttpError(res, "NEED_SESION", 401);
            return;
        }

        const token = req.headers.authorization.split(' ').pop()//toma el ultimo valor del array es decir el token
        const dataToken = await verifyToken(token);

        if(!dataToken){
            handleHttpError(res,"NOT_PAYLOAD_DATA",401);
            return;
        }

        const query =   {
            [propertiesKey.id]:dataToken[propertiesKey.id]
        }

        /*Con esto podemos desde donde inyectemos el middleware podemos usarlo para saber quien queire acceder a la data
        ve al archivo tracks de route y despues a getItems */
        const user = await usersModel.findOne(query);
        
        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        handleHttpError(res, "NOT_SESION", 401);
    }
};

module.exports = authMiddleware;