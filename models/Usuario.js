"use strict";

var mongoose = require("mongoose");

var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
},
    { __v: { type: Number, select: true}});

usuarioSchema.index({nombre: 1});
usuarioSchema.index({email: 1});

var Usuario = mongoose.model('Usuario', usuarioSchema);