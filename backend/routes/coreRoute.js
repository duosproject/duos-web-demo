'use strict';

var db = require('../db/sequelizeInstance');
var express = require('express');
var allRecordsVm = require('../viewmodels/allRecordsViewModel');
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
                attributes: { exclude: ['articleId'] },
                include: [{
                    model: db.articles,
                    attributes: ['articleTitle', 'sourceId']
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
    router.route('/all')
        .get(function (req, res) {
            db.methodApplication.findAll({
                attributes: [],
                include: [{
                    model: db.article,
                    attributes: ['articleTitle']
                },
                {
                    model: db.methodology,
                    attributes: ['methodName']
                },
                {
                    model: db.variableSet,
                    include: [{
                        model: db.varSetContains,
                        attributes: ['varSetId'],
                        include: [{
                            model: db.variable,
                            attributes: ['varName'],
                            include: [{
                                model: db.dataset,
                                attributes: ['datasetName']
                            }]
                        }]
                    }]
                }]
            })
                .then(function (data) {
                    return res.status(200).json({
                        ok: true,
                        collection: allRecordsVm(data)
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