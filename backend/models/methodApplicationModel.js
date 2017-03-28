'use strict';

//model for MethodApplication table
module.exports = function (sequelize, Sequelize) {
    var MethodApplication = sequelize.define('MethodApplication',
        {
            methodAppId: {
                field: 'MethodAppID',
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            methodId: {
                field: 'MethodID',
                type: Sequelize.INTEGER
            },
            varSetId: {
                field: 'VarSetID',
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

    return MethodApplication;
};