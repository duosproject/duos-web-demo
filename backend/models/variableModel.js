'use strict';

//model for Variable table
module.exports = function (sequelize, Sequelize) {
    var Variable = sequelize.define('Variable',
        {
            varId: {
                field: 'VarID',
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            varName: {
                field: 'VarName',
                type: Sequelize.STRING(255)
            },
            datId: {
                field: 'DatID',
                type: Sequelize.INTEGER
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

    return Variable;
};