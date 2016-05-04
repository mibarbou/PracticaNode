"use strict";

var jwt = require('jsonwebtoken');
var config = require('../../local_config');

var express = require('express');
var router = express.Router();

var Usuario = require('mongoose').model('Usuario');
var passwordHash = require('password-hash');

router.post('/', function (req, res) {

    var nombre = req.body.nombre;
    var clave = req.body.clave;
    var email = req.body.email;


    Usuario.findOne({nombre: nombre}).exec(function (err, nombre) {

        if(err){
            return res.status(500).json({success: false, error: err});
        }
        if(nombre) {
            return res.status(401).json({success: false, error: 'Sign up failed. User already exist'});
        }

        Usuario.findOne({email: email}).exec(function (err, email) {

            if(err){
                return res.status(500).json({success: false, error: err});
            }
            if(email) {
                return res.status(401).json({success: false, error: 'Sign up failed. Email already exist'});
            }

            var hashedPassword = passwordHash.generate(clave);

            var usuario = new Usuario({nombre: req.body.nombre, clave: hashedPassword, email: req.body.email});

            usuario.save(function (err, saved) {

                if (err) {
                    return next(err);
                }

                res.json({succes: true, saved: saved});
            });

        });
        
    });

});

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
        
        if(passwordHash.verify(pass, user.clave))

        if(!passwordHash.verify(pass, user.clave)) {
            return res.status(401).json({success: false, error: 'Auth failed. Invalid password.'});
        }

        var token = jwt.sign({ id: user._id}, config.jwt.secret, {
            expiresIn: 60 * 24 * 2
        });

        res.json({success: true, token: token});
    });
});

module.exports = router;