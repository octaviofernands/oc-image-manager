(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var modalConfirm = function (msg, callbackYes, callbackNo) {
  htmlModal = '' +
    '<div id="modal-confirm" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modal-confirm-label" aria-hidden="true">' +
    ' <div class="modal-dialog">' +
    '   <div class="modal-content">' +
    '     <div class="modal-header">' +
    '       <h3 id="modal-confirm-label">Confirmation</h3>' +
    '     </div>' +
    '     <div class="modal-body">' +
    '       <p>' + msg + '</p>' +
    '     </div>' +
    '     <div class="modal-footer">' +
    '       <button id="btn-cancel" class="btn">Cancel</button>' +
    '       <button id="btn-confirm" class="btn btn-primary">Confirm</button>' +
    '     </div>' +
    '   </div>' +
    ' </div>' +
    '</div>';

  $('body').append($(htmlModal));
  $('#modal-confirm').modal('show');

  $('#btn-confirm').click(function(){
    callbackYes();
    $('#modal-confirm').modal('hide');
    $('#modal-confirm').on('hidden.bs.modal', function (e) {
      $('#modal-confirm').remove();
    })
  });

  $('#btn-cancel').click(function(){
    if(typeof callbackNo != 'undefined') {
      callbackNo();
    }
    $('#modal-confirm').modal('hide');
    $('#modal-confirm').on('hidden.bs.modal', function (e) {
      $('#modal-confirm').remove();
    })
  });
};

module.exports = {
  modalConfirm: modalConfirm
};
},{}],2:[function(require,module,exports){
var util = require('./functions');

var $navContainer = $('#ocim-nav'),
    $navDefault = $('#ocim-nav-default'),
    $navSelected = $('#ocim-nav-img-selected'),
    $navForm = $('#ocim-nav-menu-form'),
    $navButtons = $('.ocim-menu-btn'),
    $imgListWrapper = $('#ocim-image-list-wrapper'),
    $imgList = $('#ocim-image-list'),
    $imgFormWrapper = $('#ocim-image-form-wrapper'),
    $imgFormStep1 = $('#ocim-form-step-1'),
    $imgCropFields = $('#ocim-image-crop-fields'),
    $imgFormStep2 = $('#ocim-form-step-2'),
    $imgFormBtnUpload = $('#ocim-image-file'),
    $imgPreview = $('#ocim-image-preview'),
    $imgDataWidth = $('#ocim-image-crop-width'),
    $imgDataHeight = $('#ocim-image-crop-height'),
    $cropSizeButtons = $('.ocim-crop-size-btn'),
    $cropSizeButtonLabel = $('#ocim-crop-sizes-btn-lbl'),
    $cropOptionsButtons = $('.ocim-crop-options-btn'),
    $cropCheckboxSaveCrop = $('#ocim-image-crop-save-size'),
    $buttonCrop = $('#ocim-image-crop-btn'),
    $buttonSetCropSize = $('#ocim-image-crop-set-size'),
    $formAppends = $('#ocim-image-form-appends'),
    $croppedImagesWrapper = $('#ocim-cropped-images-wrapper'),
    $croppedImagesToggle = $('#ocim-cropped-images-toggle'),
    $croppedItemsList = $('#ocim-cropped-images-list'),
    $croppedItems = $('.ocim-cropped-image'),
    $croppedItemButtonDelete = $('.ocim-cropped-image-delete'),
    scaleX = 1,
    scaleY = 1,
    imgWidth = 0,
    imgHeight = 0,
    cropSizeSet = false,
    freeCrop = true
    ;

var init = function () {
  $.material.init();
  $('[data-toggle="tooltip"]').tooltip();
  initUploadEvent();
  initHandleButtons();
  initFormButtons();
  /*

  */
};

var initUploadEvent = function () {
  $imgFormBtnUpload.change(function (e) {
    var that = this;
    if (this.files && this.files[0]) {
      if(validateImage(this.files[0])) {
        var reader = new FileReader();
        reader.onload = function (e) {
          loadImageUploadForm(that.files[0], e);
        }
        reader.readAsDataURL(this.files[0]);
      } else {
        console.log('arquivo inválido');
      }
    } else {
      console.log('arquivo inválido');
    }
  });
};

function loadImageUploadForm (fileData, evt) {
  var src = evt.target.result;

  $imgPreview.attr('src', src);
  showUploadForm();

  $imgPreview.cropper('destroy');
  $imgPreview.cropper({
    viewMode:1,
    aspectRatio: NaN,
    strict: true,
    responsive: true,
    checkImageOrigin: true,
    modal: true,
    guides: true,
    center: true,
    highlight: true,
    background: true,
    autoCrop: true,
    autoCropArea: 0.8,
    zoomable: false,
    zoomOnWheel: false,
    zoomOnTouch: false,
    cropBoxMovable: true,
    cropBoxResizable: false,
    doubleClickToggle: false,
    minContainerWidth: 200,
    minContainerHeight: 100,
    crop: function (e) {
      if(!cropSizeSet) {
        $imgDataHeight.val(Math.round(e.height));
        $imgDataWidth.val(Math.round(e.width));
      }
    }
  });
};

function showUploadForm () {
  $imgListWrapper.removeClass('ocim-active');
  $imgFormWrapper.addClass('ocim-active');
  $navForm.addClass('ocim-active').siblings().removeClass('ocim-active');
};

var initHandleButtons = function () {
  $navButtons.click(function (e) {
    e.preventDefault();
    var rel = $(this).attr('rel');
    switch (rel) {
      case 'upload':
        $imgFormBtnUpload.click();
        break;
    }
  });
};

var initFormButtons = function () {
  $('body').on('click', $cropOptionsButtons.selector, function (e) {
    e.preventDefault();
    var action = $(this).attr('rel');

    switch (action) {
      case 'rotate':
        var value = parseInt($(this).attr('data-value'));
        $imgPreview.cropper('rotate', value);
        break;

      case 'invert':
        var value = $(this).attr('data-value');

        if(value == 'horizontal') {
          $imgPreview.cropper('scale', -scaleX, scaleY);
          scaleX = -scaleX;
        } else {
          $imgPreview.cropper('scale', scaleX, -scaleY);
          scaleY = -scaleY
        }
        break;
    }
  });

  $('body').on('click', $cropSizeButtons.selector, function (e) {
    e.preventDefault();
    var ratio = $(this).attr('rel');

    $cropSizeButtonLabel.html(ratio);


    switch (ratio) {
      case 'free':
        cropSizeSet = false;
        freeCrop = true;
        $imgPreview.cropper('setAspectRatio', NaN);
        $imgCropFields.addClass('ocim-active');
        break;

      default:
        var dimensions = ratio.split('x');
        imgWidth = parseInt(dimensions[0]);
        imgHeight = parseInt(dimensions[1]);
        var aspectRatio = imgWidth / imgHeight;
        freeCrop = false;

        $imgPreview.cropper('setAspectRatio', aspectRatio);
        $imgCropFields.removeClass('ocim-active');
        break;
    }
  });

  $('body').on('click', $buttonSetCropSize.selector, function (e) {
    e.preventDefault();
    imgWidth = parseInt($imgDataWidth.val());
    imgHeight = parseInt($imgDataHeight.val());
    var aspectRatio = imgWidth / imgHeight;
    cropSizeSet = true;

    $imgPreview.cropper('setAspectRatio', aspectRatio);
  });

  $('body').on('click', $buttonCrop.selector, function (e) {
    e.preventDefault();
    cropImage();
  });

  $('body').on('click', $croppedImagesToggle.selector, function (e) {
    e.preventDefault();
    $croppedImagesWrapper.toggleClass('ocim-show');
  });

  $('body').on('click', $croppedItemButtonDelete.selector, function (e) {
    e.preventDefault();

    var $btn = $(this);
    var $container = $btn.closest($croppedItems.selector);

    util.modalConfirm('Delete this crop?', function () {
      $container.fadeOut(200, function() {
        if($($container.selector).length == 0) {
          $croppedImagesWrapper.removeClass('ocim-active');
          $croppedImagesWrapper.removeClass('ocim-show');
        }

        $container.remove();
      });
    });
  });
};

var cropImage = function () {
  var croppedData = $imgPreview.cropper('getData');

  croppedData.imgWidth = imgWidth > 0 ? imgWidth : Math.ceil(croppedData.width);
  croppedData.imgHeight = imgHeight > 0 ? imgHeight : Math.ceil(croppedData.height);
  croppedData.cropSizeExists = !freeCrop;
  croppedData.saveCrop = $cropCheckboxSaveCrop.is(':checked') ? 1 : 0;

  var canvas = $imgPreview.cropper('getCroppedCanvas');
  var croppedDataJson = JSON.stringify(croppedData);
  var field = $('<input type="hidden" name="imgcropdata[]">').val(croppedDataJson);
  var htmlItem = '' +
    '<div class="' + $croppedItems.selector.replace('.', '') + '" >' +
    ' <a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete image" class="btn btn-xs btn-danger ' + $croppedItemButtonDelete.selector.replace('.', '') + '"><i class="fa fa-trash-o"></i></a>' +
    '</div>';

  $croppedItemsList.prepend($(htmlItem).append(canvas).append(field));
  $croppedImagesWrapper.addClass('ocim-active');
  toastCroppedImage();
  croppedWrapperPositioning();
  resetCropForm();
};

var croppedWrapperPositioning = function () {
  var croppedWrapperHeight = $(window).height() - $croppedImagesWrapper.offset().top - 20;
  $croppedImagesWrapper.height(croppedWrapperHeight);
}

function toastCroppedImage () {
  $croppedImagesWrapper.addClass('ocim-show');
  setTimeout(function () {
    $croppedImagesWrapper.removeClass('ocim-show');
  },1000);
}

var resetCropForm = function () {
  $cropCheckboxSaveCrop.prop('checked', false);
  $cropSizeButtons.removeClass('ocim-active');
  $($cropSizeButtons.selector + '[rel="free"]').addClass('ocim-active');
  $imgCropFields.show();
  $imgDataWidth.val('');
  $imgDataHeight.val('');
  $imgPreview.cropper('reset');
  scaleX = 1;
  scaleY = 1;
  imgWidth = 0;
  imgHeight = 0;
  cropSizeSet = false;
  freeCrop = true;
};

var validateImage = function (file) {
  var arrMimes = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
  var maxSize = 10 * 1024 * 1024; //size in MB

  if (arrMimes.indexOf(file.type.toLowerCase()) < 0) {
    return false;
  }

  if(file.size > maxSize) {
    return false;
  }

  return true;
};

$(document).ready(function () {
  init();
});
},{"./functions":1}]},{},[2]);
