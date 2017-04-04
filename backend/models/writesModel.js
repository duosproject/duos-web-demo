'use strict';

//model for Writes table
module.exports = function (sequelize, Sequelize) {
    var Writes = sequelize.define('Writes',
        {
            writesId: {
                field: 'WritesID',
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            authorId: {
                field: 'AuthorID',
                type: Sequelize.INTEGER
            },
            articleId: {
                field: 'ArticleID',
                type: Sequelize.INTEGER
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

    return Writes;
};