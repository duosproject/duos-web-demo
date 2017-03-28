'use strict';

//set up ORM for PostgreSQL
var Sequelize = require('sequelize');

//models import
var taggedInstancesModel = require('../models/taggedInstancesModel');
var articlesModel = require('../models/articlesModel');
var articleModel = require('../models/articleModel');
var datasetModel = require('../models/datasetModel');
var methodApplicationModel = require('../models/methodApplicationModel');
var methodologyModel = require('../models/methodologyModel');
var variableModel = require('../models/variableModel');
var variableSetModel = require('../models/variableSetModel');
var varSetContainsModel = require('../models/varSetContainsModel');


//connection
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


//initializing models
var taggedInstances = taggedInstancesModel(sequelize, Sequelize);
var articles = articlesModel(sequelize, Sequelize);
var article = articleModel(sequelize, Sequelize);
var dataset = datasetModel(sequelize, Sequelize);
var methodApplication = methodApplicationModel(sequelize, Sequelize);
var methodology = methodologyModel(sequelize, Sequelize);
var variable = variableModel(sequelize, Sequelize);
var variableSet = variableSetModel(sequelize, Sequelize);
var varSetContains = varSetContainsModel(sequelize, Sequelize);


//defining relations
taggedInstances.belongsTo(articles, {
    foreignKey: 'articleId'
});
articles.hasMany(taggedInstances, {
    foreignKey: 'articleId'
});


module.exports = {
    taggedInstances: taggedInstances,
    articles: articles,
    article: article,
    dataset: dataset,
    methodApplication: methodApplication,
    methodology: methodology,
    variable: variable,
    variableSet: variableSet,
    varSetContains: varSetContains
};