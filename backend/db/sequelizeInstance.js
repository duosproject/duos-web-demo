'use strict';

var Sequelize = require('sequelize');
var taggedInstancesModel = require('../models/taggedInstancesModel');

var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    protocol: 'postgres',
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    logging: false,
    dialectOptions: {
        ssl: true
    }
});

module.exports = {
    taggedInstances: taggedInstancesModel(sequelize, Sequelize)
};