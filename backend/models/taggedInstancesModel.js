'use strict';

//model for TaggedInstances table
module.exports = function (sequelize, Sequelize) {
    var TaggedInstances = sequelize.define('TaggedInstances',
        {
            instanceId: {
                field: 'InstanceID',
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            articleId: {
                field: 'articleID',
                type: Sequelize.INTEGER
            },
            parentObjectId: {
                field: 'parentObjectID',
                type: Sequelize.STRING(5)
            },
            objectId: {
                field: 'objectID',
                type: Sequelize.STRING(5)
            },
            tag: Sequelize.STRING(20),
            value: Sequelize.STRING(255),
            context: Sequelize.TEXT
        },
        {
            timestamps: false,
            freezeTableName: true
        });

    return TaggedInstances;
};