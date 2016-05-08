"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var PushToken = mongoose.model('PushToken');

router.put('/', function (req, res, next) {

    var plataforma = req.body.plataforma;
    var token = req.body.token;
    var usuario = req.body.usuario;

    var query = {'token':req.body.token};

    PushToken.findOneAndUpdate(
        query,
        req.body,
        {upsert: true},
        function(err, saved){
            if(err) {
                return res.status(500).json({success: false, error: err});
            }
            res.json({succes: true, saved: saved});
        });

});

module.exports = router;