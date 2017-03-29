'use strict';

var db = require('../db/sequelizeInstance');
var express = require('express');
var router = express.Router();

module.exports = function (app) {

    //returns all variables for selected dataset
    router.route('/dataset/variables/:datasetId')
        .get(function (req, res) {
            db.dataset.findById(req.params.datasetId, {
                attributes: ['datasetName'],
                include: [{
                    model: db.variable,
                    attributes: ['varName']
                }]
            })
                .then(function (data) {
                    return res.status(200).json({ ok: true, collection: data });
                })
                .catch(function (err) {
                    return res.status(500).json({ ok: false, error: err.message });
                });
        });

    app.use('/api/support', router);
};