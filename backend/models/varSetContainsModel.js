'use strict';

//model for VarSetContains table
module.exports = function (sequelize, Sequelize) {
    var VarSetContains = sequelize.define('VarSetContains',
        {
            varSetContainsId: {
                field: 'VarSetContainsID',
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            varSetId: {
                field: 'VarSetID',
                type: Sequelize.INTEGER
            },
            varId: {
                field: 'VarID',
                type: Sequelize.INTEGER
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

    return VarSetContains;
};