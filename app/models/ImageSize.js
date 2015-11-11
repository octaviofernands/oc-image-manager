/*global require, exports, console, module*/
var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var imageSizeSchema = new mongoose.Schema({
    title: String,
    width: Number,
    height: Number,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ImageSize', imageSizeSchema);