'use strict';

//model for Methodology table
module.exports = function (sequelize, Sequelize) {
    var Methodology = sequelize.define('Methodology',
        {
            methodId: {
                field: 'MethodID',
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            methodName: {
                field: 'MethodName',
                type: Sequelize.STRING(255)
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

    return Methodology;
};