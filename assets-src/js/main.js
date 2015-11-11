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
    $imgFormBtnUpload = $('#image-file'),
    $imgPreview = $('#ocim-image-preview')
    ;

var init = function () {
  $.material.init();
  initUploadEvent();
  initHandleButtons();
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
    dragCrop: true,
    movable: false,
    rotatable: false,
    scalable: false,
    zoomable: false,
    mouseWheelZoom: false,
    touchDragZoom: false,
    cropBoxMovable: true,
    cropBoxResizable: true,
    doubleClickToggle: false,
    minContainerWidth: 200,
    minContainerHeight: 100,
    crop: function (e) {

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

function validateImage (file) {
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