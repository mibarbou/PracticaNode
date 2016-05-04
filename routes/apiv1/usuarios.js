"use strict";

var jwt = require('jsonwebtoken');
var config = require('../../local_config');

var express = require('express');
var router = express.Router();

var Usuario = require('mongoose').model('Usuario');

var bcrypt = require('bcrypt');
const saltRounds = 10;

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
            // hacemos el hash de la clave recibida que guardaremos en la BD

            bcrypt.hash(clave, saltRounds, function(err, hash) {
                if(err) {
                    return res.status(401).json({success: false, error: 'Sign up failed. something went wrong'});
                }

                var usuario = new Usuario({nombre: req.body.nombre, clave: hash, email: req.body.email});

                usuario.save(function (err, saved) {

                    if (err) {
                        return next(err);
                    }

                    res.json({succes: true, saved: saved});
                });
                
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
        
        // Verificamos que los hashes de la clave recibida y la guardada en BD no sean la misma
      

        bcrypt.compare(pass, user.clave, function(err, verify) {
            if(err){
                return res.status(401).json({success: false, error: 'Log in failed. something went wrong'});
            }
            if(!verify){
                return res.status(401).json({success: false, error: 'Auth failed. Invalid password.'});
            }

            var token = jwt.sign({ id: user._id}, config.jwt.secret, {
                expiresIn: 60 * 24 * 2
            });

            res.json({success: true, token: token});
            
        });
        
    });
});

module.exports = router;