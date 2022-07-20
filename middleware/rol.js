const {handleHttpError} =  require("../utils/handleError");
/**
 * Array con los roles permitidos
 * @param {*} roles 
 * @returns 
 */
const checkRole = (roles) => (req, res, next) => {
    try{
        const { user } = req;
        console.log(user);
        const rolesByUser =  user.role;

        const checkValues = roles.some((roleSingle) => rolesByUser.includes(roleSingle));

        if(!checkValues){
            handleHttpError(res,"USER_NO_PERMISSIONS",403);
        }
        
        next();
    }catch{
        handleHttpError(res,"ERROR_PERMISSIONS,403");
    }
}

module.exports =  checkRole; 