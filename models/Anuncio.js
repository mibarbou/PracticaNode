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

// Hacer método estático
anuncioSchema.statics.list = function (filter, start, limit, sort, cb) {

        var query = Anuncio.find(filter);
        query.skip(start);
        query.limit(limit);
        query.sort(sort);
        return query.exec(cb);
};

// anuncioSchema.statics.list = function () {
//
//         return new Promise(function (resolve, reject) {
//
//                 fs.readFile(__dirname + '/../anunciosMock.json', 'utf-8', function (err, data) {
//
//                         if(err) {
//                                
//                                 return reject(err);
//                         }
//                         return resolve(JSON.parse(data));
//                 });
//         });
// };

var Anuncio = mongoose.model('Anuncio', anuncioSchema);