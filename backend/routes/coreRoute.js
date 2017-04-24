'use strict';

var db = require('../db/sequelizeInstance');
var express = require('express');
var globalRecordsVm = require('../viewmodels/globalRecordsViewModel');
var router = express.Router();

module.exports = function (app) {

    //returns all the records from TaggedInstances table
    router.route('/taggedInstances')
        .get(function (req, res) {
            db.taggedInstances.findAll()
                .then(function (data) {
                    return res.status(200).json({ ok: true, collection: data });
                })
                .catch(function (err) {
                    return res.status(500).json({ ok: false, error: err.message });
                });
        });

    //returns all the records from Articles table
    router.route('/articles')
        .get(function (req, res) {
            db.articles.findAll()
                .then(function (data) {
                    return res.status(200).json({ ok: true, collection: data });
                })
                .catch(function (err) {
                    return res.status(500).json({ ok: false, error: err.message });
                });
        });


    //returns all the records from TaggedInstances table joined with Articles table
    router.route('/taggedInstances/articles')
        .get(function (req, res) {
            db.taggedInstances.findAll({
                include: [{
                    model: db.articles
                }]
            })
                .then(function (data) {
                    return res.status(200).json({ ok: true, collection: data });
                })
                .catch(function (err) {
                    return res.status(500).json({ ok: false, error: err.message });
                });
        });

    //returns all the records from all linked tables
    router.route('/global')
        .get(function (req, res) {
            db.methodApplication.findAll({
                include: [{
                    model: db.article,
                    include: [
                        {
                            model: db.writes,
                            include: [{
                                model: db.author
                            }]
                        },
                        {
                            model: db.covers,
                            include: [{
                                model: db.topic
                            }]
                        }
                    ]
                },
                {
                    model: db.methodology,
                },
                {
                    model: db.variableSet,
                    include: [{
                        model: db.varSetContains,
                        include: [{
                            model: db.variable,
                            include: [{
                                model: db.dataset
                            }]
                        }]
                    }]
                }]
            })
                .then(function (data) {
                    return res.status(200).json({
                        ok: true,
                        collection: globalRecordsVm(data)
                    });
                })
                .catch(function (err) {
                    return res.status(500).json({
                        ok: false,
                        error: err.message
                    });
                });
        });

    app.use('/api/core', router);
};