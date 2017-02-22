'use strict';

var db = require('../db/sequelizeInstance');
var express = require('express');
var router = express.Router();

module.exports = function (app) {

    router.route('/taggedInstances')
        .get(function (req, res) {
            db.taggedInstances.findAll()
                .then(function (data) {

                    var collection = [];

                    data.forEach(function (element) {
                        collection.push({
                            instanceId: element.instanceId,
                            articleId: element.articleId,
                            parentObjectId: element.parentObjectId,
                            objectId: element.objectId,
                            tag: element.tag,
                            value: element.value,
                            context: element.context
                        });
                    });

                    return res.status(200).json({ ok: true, data: collection });
                })
                .catch(function (err) {
                    return res.status(500).json({ ok: false, error: err.message });
                });
        });

    app.use('/api/core', router);
};