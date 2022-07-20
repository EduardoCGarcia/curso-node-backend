const { validationResult } = require("express-validator");

const validateResults = (req, res, next) => {
    try{
        /* Valida las peticiones que est estan haciendo
        y si hay algiun error crasea y manda un error */
        validationResult(req).throw();
        return next();
    }catch(err){
        res.status(403);
        res.send({ errors:err.array() })
    }
};

module.exports = validateResults;