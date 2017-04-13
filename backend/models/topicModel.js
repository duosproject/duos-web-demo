'use strict';

//model for Topic table
module.exports = function (sequelize, Sequelize) {
    var Topic = sequelize.define('Topic',
        {
            topicId: {
                field: 'TopicID',
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            topicName: {
                field: 'TopicName',
                type: Sequelize.STRING(255)
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

    return Topic;
};