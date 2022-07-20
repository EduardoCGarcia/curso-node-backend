const bcrypt =  require("bcrypt");

/**
 * Contraseña sin encriptar
 * @param {*} passwordPlain 
 */
const encrypt = async(passwordPlain) => {
     const hash = await bcrypt.hash(passwordPlain,10);
    return hash;
};

/**
 * 
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 * @returns 
 */
const compare = async(passwordPlain,hashPassword) => {
    return await bcrypt.compare(passwordPlain,hashPassword )
};

module.exports =  { encrypt,compare };

