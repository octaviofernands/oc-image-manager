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
    $imgFormStep2 = $('#ocim-form-step-2'),
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
    $croppedImagesWrapper = $('#ocim-cropped-images-wrapper'),
    $croppedImagesToggle = $('#ocim-cropped-images-toggle'),
    $croppedItemsList = $('#ocim-cropped-images-list'),
    $croppedItems = $('.ocim-cropped-image'),
    $croppedItemButtonDelete = $('.ocim-cropped-image-delete'),
    $buttonMetadata = $('#ocim-form-btn-image-meta'),
    $buttonEditor = $('#ocim-form-btn-image-editor'),
    $buttonFinish = $('.ocim-form-btn-save'),
    $formMetaImgTitle = $('#ocim-field-image-title'),
    $formMetaImgAlt = $('#ocim-field-image-alt'),
    $formMetaImgCredits = $('#ocim-field-image-credits'),
    $formMetaInfoFileName = $('#ocim-file-info-file-name'),
    $formMetaInfoFileSize = $('#ocim-file-info-file-size'),
    $formMetaInfoFileType = $('#ocim-file-info-file-type'),
    $formMetaInfoFileRes = $('#ocim-file-info-file-res'),
    $formMetaInfoFileCrops = $('#ocim-file-info-file-crops'),
    scaleX = 1,
    scaleY = 1,
    imgWidth = 0,
    imgHeight = 0,
    cropSizeSet = false,
    freeCrop = true,
    cropsizes = []
    ;

var init = function () {
  $.material.init();
  $('[data-toggle="tooltip"]').tooltip();
  initUploadEvent();
  initHandleButtons();
  initFormButtons();
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

  fillImageInfo(fileData, src);

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
    cropBoxResizable: true,
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

var fillImageInfo = function (fileData, src) {
  imgTitle = ''; //fileData.name
  $formMetaImgTitle.val(imgTitle);

  $formMetaInfoFileName.html(fileData.name);
  $formMetaInfoFileSize.html(getFileSize(fileData.size));
  $formMetaInfoFileType.html(fileData.type);

  getImageOriginalResolution(src, function (res) {
    $formMetaInfoFileRes.html(res);
  });


  //$formMetaInfoFileRes = $('#ocim-file-info-file-res');
};

var getImageOriginalResolution = function (src, callback) {
  var tmpImg = new Image();

  tmpImg.onload = function () {
    var width = tmpImg.width;
    var height = tmpImg.height;
    var dimensions = width + 'x' + height;

    callback(dimensions);
  }

  tmpImg.src = src;
};

var getFileSize = function (sizeBytes) {
  var suffix = '';
  var size = '';
  if(sizeBytes / (1000 * 1024) > 1) {
    size = (sizeBytes / (1000 * 1024)).toFixed(2);
    suffix = 'mb'
  } else if(sizeBytes / 1024 > 1) {
    size = (sizeBytes / 1024).toFixed(2);
    suffix = 'kb'
  } else {
    size = sizeBytes;
    suffix = 'bytes';
  }

  return size + suffix;
};

var showUploadForm = function () {
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
        $container.remove();
        if($($croppedItemsList.selector + '>div').length == 0) {
          $croppedImagesWrapper.removeClass('ocim-active');
          $croppedImagesWrapper.removeClass('ocim-show');
        }


      });
    });
  });

  $('body').on('click', $buttonMetadata.selector, function (e) {
    e.preventDefault();

    $imgFormStep1.hide();
    $imgFormStep2.show();
  });

  $('body').on('click', $buttonEditor.selector, function (e) {
    e.preventDefault();

    $imgFormStep2.hide();
    $imgFormStep1.show();
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

  $formMetaInfoFileCrops.append('<li>' + croppedData.imgWidth + 'x' + croppedData.imgHeight + '</li>');
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

var toastCroppedImage = function () {
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

var resetForm = function () {
  $formMetaImgTitle.val('');
  $formMetaImgAlt.val('');
  $formMetaImgCredits.val('');
  $formMetaInfoFileName.html('');
  $formMetaInfoFileSize.html('');
  $formMetaInfoFileType.html('');
  $formMetaInfoFileRes.html('');
  $formMetaInfoFileCrops.html('');
  $croppedItemsList.html('');
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