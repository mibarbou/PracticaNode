"use strict";

var jwt = require('jsonwebtoken');
var config = require('../../local_config');

var express = require('express');
var router = express.Router();

var Usuario = require('mongoose').model('Usuario');

router.post('/authenticate', function (req, res) {

    var user = req.body.user;
    var pass = req.body.pass;

    Usuario.findOne({nombre: user}).exec(function (err, user) {

        if(err){
            return res.status(500).json({success: false, error: err});
        }
        if(!user) {
            return res.status(401).json({success: false, error: 'Auth failed. User not found.'});
        }

        if(user.clave !== pass) {
            return res.status(401).json({success: false, error: 'Auth failed. Invalid password.'});
        }

        var token = jwt.sign({ id: user._id}, config.jwt.secret, {
            expiresIn: 60 * 24 * 2
        });

        res.json({success: true, token: token});
    });
});

module.exports = router;