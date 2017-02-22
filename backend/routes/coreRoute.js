'use strict';

var db = require('../db/sequelizeInstance');
var taggedInstancesVm = require('../viewmodels/taggedInstancesViewModel');
var express = require('express');
var router = express.Router();

module.exports = function (app) {

    router.route('/taggedInstances')
        .get(function (req, res) {
            db.taggedInstances.findAll()
                .then(function (data) {
                    return res.status(200).json({ ok: true, collection: taggedInstancesVm(data) });
                })
                .catch(function (err) {
                    return res.status(500).json({ ok: false, error: err.message });
                });
        });

    app.use('/api/core', router);
};