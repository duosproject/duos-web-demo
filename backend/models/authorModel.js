'use strict';

//model for Author table
module.exports = function (sequelize, Sequelize) {
    var Author = sequelize.define('Author',
        {
            authorId: {
                field: 'AuthorID',
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            authorName: {
                field: 'AuthorName',
                type: Sequelize.STRING(255)
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

    return Author;
};