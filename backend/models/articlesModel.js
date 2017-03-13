'use strict';

//model for Articles table
module.exports = function (sequelize, Sequelize) {
    var Articles = sequelize.define('Articles',
        {
            articleId: {
                field: 'articleID',
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            articleTitle: {
                type: Sequelize.STRING(255)
            },
            sourceId: {
                field: 'sourceID',
                type: Sequelize.INTEGER
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

    return Articles;
};