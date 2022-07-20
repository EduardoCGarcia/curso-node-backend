const {sequelize} =  require("../../config/mysql");
const {DataTypes} =  require("sequelize");

const Storage = sequelize.define(
    "storage",
    {
        url:{
            type:DataTypes.STRING,
            allowNull: null
        },
        filename:{
            type:DataTypes.STRING,
        }
    },
    {
        timestamps:true,
    }

);

module.exports = Storage;