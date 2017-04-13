'use strict';

//model for Covers table
module.exports = function (sequelize, Sequelize) {
    var Covers = sequelize.define('Covers',
        {
            coverId: {
                field: 'CoversID',
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            articleId: {
                field: 'ArticleID',
                type: Sequelize.INTEGER
            },
            topicId: {
                field: 'TopicID',
                type: Sequelize.INTEGER
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

    return Covers;
};