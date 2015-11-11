/*global require, exports, console, module*/
var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var imageSchema = new mongoose.Schema({
    title: String,
    alt: String,
    credits: String,
    path: String,
    sizeBytes: Number,
    extension: String,
    sizes: {},
    tags: [String],
    created: { type: Date, default: Date.now }
});

/******
size item:
"widthxheight" : {
    w: width,
    h: height,
    cropX: crop_x_from_original,
    cropY: crop_y_from_original,
    path: image_path,
    sizeBytes: Number,
    extension: String,
    resized: Boolean
}
******/

module.exports = mongoose.model('Image', imageSchema);