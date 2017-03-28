'use strict';

//model for Article table
module.exports = function (sequelize, Sequelize) {
    var Article = sequelize.define('Article',
        {
            articleId: {
                field: 'ArticleID',
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            articleTitle: {
                field: 'ArticleTitle',
                type: Sequelize.STRING(255)
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

    return Article;
};