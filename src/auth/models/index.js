"use strict";

require("dotenv");

const UsersModel = require('./users-model');
const POSTGRES_URI = process.env.NODE_ENV="test" ?'sqlite:memory' :process.env.DATABASE_URL;
const {Sequelize, DataTypes} = require('sequelize');

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  } : {};

const sequelize = new Sequelize(POSTGRES_URI,sequelizeOptions);

module.exports = {
    db: sequelize,
    UsersModel:UsersModel(sequelize, DataTypes),    
}


