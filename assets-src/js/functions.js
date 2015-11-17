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