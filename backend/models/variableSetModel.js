'use strict';

//model for VariableSet table
module.exports = function (sequelize, Sequelize) {
    var VariableSet = sequelize.define('VariableSet',
        {
            varSetId: {
                field: 'VarSetID',
                type: Sequelize.INTEGER,
                primaryKey: true
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

    return VariableSet;
};