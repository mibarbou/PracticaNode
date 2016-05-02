"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');

//var jwtAuth = require('../../lib/jwtAuth');

//router.use(jwtAuth());

router.get('/', function (req, res, next) {
    var name = req.query.name;
    var start = parseInt(req.query.start) || 0;
    var limit = parseInt(req.query.limit) || null;
    var sort = req.sort || null;

    var criteria = {};

    if (typeof  name !== 'undefined'){
        criteria.name = name;
    }

    Anuncio.list(criteria, start, limit, sort, function (err, rows) {

        if (err) {
            return res.json({success: false, error: err});
        }
        res.json({success: true, rows: rows});
    });
});

module.exports = router;