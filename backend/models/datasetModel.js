'use strict';

//model for Dataset table
module.exports = function (sequelize, Sequelize) {
    var Dataset = sequelize.define('Dataset',
        {
            datId: {
                field: 'DatID',
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            datasetName: {
                field: 'DatasetName',
                type: Sequelize.STRING(255)
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

    return Dataset;
};