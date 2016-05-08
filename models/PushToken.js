"use strict";

var mongoose = require("mongoose");

var pushTokenSchema = mongoose.Schema({
    plataforma: {type: String,
        enum: ['ios', 'android']},
    token: String,
    usuario: String
});

var PushToken = mongoose.model('PushToken', pushTokenSchema);