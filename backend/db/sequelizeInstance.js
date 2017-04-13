'use strict';

//set up ORM for PostgreSQL
var Sequelize = require('sequelize');

//models import
var taggedInstancesModel = require('../models/taggedInstancesModel');

var authorModel = require('../models/authorModel');
var writesModel = require('../models/writesModel');

var articlesModel = require('../models/articlesModel');
var articleModel = require('../models/articleModel');

var topicModel = require('../models/topicModel');
var coversModel = require('../models/coversModel');

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

var author = authorModel(sequelize, Sequelize);
var writes = writesModel(sequelize, Sequelize);

var articles = articlesModel(sequelize, Sequelize);
var article = articleModel(sequelize, Sequelize);

var topic = topicModel(sequelize, Sequelize);
var covers = coversModel(sequelize, Sequelize);

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

variable.belongsTo(dataset, {
    foreignKey: 'datId'
});
dataset.hasMany(variable, {
    foreignKey: 'datId'
});

varSetContains.belongsTo(variable, {
    foreignKey: 'varId'
});
variable.hasMany(varSetContains, {
    foreignKey: 'varId'
});

variableSet.hasMany(varSetContains, {
    foreignKey: 'varSetId'
});
varSetContains.belongsTo(variableSet, {
    foreignKey: 'varSetId'
});

methodApplication.belongsTo(article, {
    foreignKey: 'articleId'
});
article.hasMany(methodApplication, {
    foreignKey: 'articleId'
});

methodApplication.belongsTo(methodology, {
    foreignKey: 'methodId'
});
methodology.hasMany(methodApplication, {
    foreignKey: 'methodId'
});

methodApplication.belongsTo(variableSet, {
    foreignKey: 'varSetId'
});
variableSet.hasMany(methodApplication, {
    foreignKey: 'varSetId'
});

//start of relation between Article and Author
article.hasMany(writes, {
    foreignKey: 'articleId'
});
writes.belongsTo(article, {
    foreignKey: 'articleId'
});

author.hasMany(writes, {
    foreignKey: 'authorId'
});
writes.belongsTo(author, {
    foreignKey: 'authorId'
});
//end of relation

//start of relation between Article and Topic
article.hasMany(covers, {
    foreignKey: 'articleId'
});
covers.belongsTo(article, {
    foreignKey: 'articleId'
});

topic.hasMany(covers, {
    foreignKey: 'topicId'
});
covers.belongsTo(topic, {
    foreignKey: 'topicId'
});
//end of relation



module.exports = {
    taggedInstances: taggedInstances,

    author: author,
    writes: writes,

    articles: articles,
    article: article,

    topic: topic,
    covers: covers,

    dataset: dataset,
    methodApplication: methodApplication,
    methodology: methodology,
    variable: variable,
    variableSet: variableSet,
    varSetContains: varSetContains
};