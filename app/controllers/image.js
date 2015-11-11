var ImageModel = require('../models/Image');

/**
 * GET /images/list
 * List images in json.
 * @param req
 * @param res
 * @param callback
 */
exports.getImages = function (req, res, callback) {
  "use strict";

  var page = (parseInt(req.query.page) - 1) || 0,
    perPage = req.query.length || 20,
    skip = (page * perPage) > 0 ? (page * perPage) || 0,
    query = req.query.search ? req.query.search  || '' : '',
    imagesObj;


  ImageModel.count(function (err, recordsTotal) {
    if (err) {
      console.log(err);
    } else if (query !== '') {
      ImageModel.find({title: new RegExp(query, "gi")}).exec(function (err, images) {
          if (err) { console.log(err); }
          var filtered = images.length;
          ImageModel.find({
            title: new RegExp(query, "gi"),
            alt: new RegExp(query, "gi"),
            credits: new RegExp(query, "gi"),
            tags: new RegExp(query, "gi"),

          }).skip(skip).limit(perPage).exec(function (err, images) {
            if (err) { console.log(err); }
            imagesObj = {
              images: images,
              total: recordsTotal,
              filtered: filtered
            }
            callback(imagesObj);
          });
      });
    } else {
      ImageModel.find().skip(skip).limit(perPage).exec(function (err, images) {
        if (err) { console.log(err); }
        imagesObj = {
          images: images,
          total: recordsTotal,
          filtered: filtered
        }
        callback(imagesObj);
      });
    }
  });
};

/**
 * GET /images/send
 * List images in json.
 * @param req
 * @param res
 * @param callback
 */
exports.postImages = function (req, res, callback) {
  "use strict";
};