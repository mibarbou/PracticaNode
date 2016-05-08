"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');

var jwtAuth = require('../../lib/jwtAuth');

router.use(jwtAuth());

router.get('/', function (req, res, next) {
    var nombre = req.query.nombre;
    var venta = req.query.venta;
    var precio = req.query.precio;
    var tag = req.query.tag;
    var start = parseInt(req.query.start) || 0;
    var limit = parseInt(req.query.limit) || null;
    var sort = req.sort || null;

    var criteria = {};

    if (typeof  nombre !== 'undefined'){
        criteria.nombre = new RegExp('^' + nombre, "i");
    }

    if (typeof  venta !== 'undefined'){
        criteria.venta = venta;
    }

    if (typeof  precio !== 'undefined'){
        criteria.precio = precio;
    }

    if (typeof  tag !== 'undefined'){
        criteria.tags = { "$all" : [tag]} ;
    }

    Anuncio.list(criteria, start, limit, sort, function (err, rows) {

        if (err) {
            return res.json({success: false, error: err});
        }
        res.json({success: true, rows: rows});
    });
});


module.exports = router;