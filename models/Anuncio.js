"use strict";

var mongoose = require('mongoose');
var fs = require('fs');

var anuncioSchema = mongoose.Schema(
    { nombre: String,
        venta: Boolean,
        precio: Number,
        foto: String,
        tags: [String]
});

anuncioSchema.statics.list = function (filter, start, limit, sort, cb) {

        var query = Anuncio.find(filter);
        query.skip(start);
        query.limit(limit);
        query.sort(sort);
        return query.exec(cb);
};


var Anuncio = mongoose.model('Anuncio', anuncioSchema);