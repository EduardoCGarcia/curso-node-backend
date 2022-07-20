const customHeader = (req,res,next) => {
    try {
        const apyKey =  req.headers.api_key;
        if(apyKey === "leifer-01"){
            next();
        }else{
            res.status(403);
            res.send({error:"API_KEY_NO_ES_CORRECTA"})
        }
    } catch (e) {
        res.status(403);
        res.send({error:"ALGO_OCURRIO_EN_EL_CUSTOM_HEADERS"})
    }
}

module.exports = customHeader;