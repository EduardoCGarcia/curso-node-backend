const {Sequelize} = require("sequelize");

const database =  process.env.MISQL_DATABASE;
const userName =  process.env.MISQL_USER;
const password =  process.env.MISQL_PASSWORD;
const host =  process.env.MISQL_HOST;

const sequelize = new Sequelize(
    database,
    userName,
    password,
    {
        host,
        dialect:"mysql"
    }
);

const dbConnectMySql =  async () => {
    try {
        await sequelize.authenticate(
            console.log("***** MYSQL CONEXIÓN CORRECTA *****")
        )
    } catch (error) {
        console.log("*****MYSQL ERROR DE CONEXION*****", error);
    }
};


module.exports =  {sequelize, dbConnectMySql};

