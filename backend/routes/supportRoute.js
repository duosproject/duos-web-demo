'use strict';

var db = require('../db/sequelizeInstance');
var express = require('express');
var articleIdVm = require('../viewmodels/supportArticlesIdViewModel');
var globalRecordsVm = require('../viewmodels/globalRecordsViewModel');
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

    //returns all articles IDs by author
    router.route('/articles/author/:authorId')
        .get(function (req, res) {
            db.writes.findAll({
                attributes: ['articleId'],
                where: {
                    authorId: req.params.authorId
                }
            })
                .then(function (data) {
                    return res.status(200).json({
                        ok: true,
                        collection: articleIdVm(data)
                    });
                })
                .catch(function (err) {
                    return res.status(500).json({
                        ok: false,
                        error: err.message
                    });
                });
        });

    //returns all articles IDs by topic
    router.route('/articles/topic/:topicId')
        .get(function (req, res) {
            db.covers.findAll({
                attributes: ['articleId'],
                where: {
                    topicId: req.params.topicId
                }
            })
                .then(function (data) {
                    return res.status(200).json({
                        ok: true,
                        collection: articleIdVm(data)
                    });
                })
                .catch(function (err) {
                    return res.status(500).json({
                        ok: false,
                        error: err.message
                    });
                });
        });

    //returns all articles IDs with specific method application
    router.route('/articles/method/:methodId')
        .get(function (req, res) {
            db.methodApplication.findAll({
                attributes: ['articleId'],
                where: {
                    methodId: req.params.methodId
                }
            })
                .then(function (data) {
                    return res.status(200).json({
                        ok: true,
                        collection: articleIdVm(data)
                    });
                })
                .catch(function (err) {
                    return res.status(500).json({
                        ok: false,
                        error: err.message
                    });
                });
        });

    //returns selected articles' records from all linked tables
    router.route('/global/articles')
        .post(function (req, res) {
            db.methodApplication.findAll({
                include: [{
                    model: db.article,
                    where: {
                        articleId: {
                            $in: JSON.parse(req.body.articleIds)
                        }
                    },
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

    app.use('/api/support', router);
};