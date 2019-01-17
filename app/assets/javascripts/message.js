$(function(){
  function buildHTML (message){
    var image = (message.image) ? `<img src=${message.image} />` : ""
    var html = `<div class="message" data-message-id="${message.id}" >
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    ${image}
                  </div>
                </div>`
    console.log(message.id)
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.text').val('')
      $('.file').val('')
      $('.messages').append(html)
      $('.main__center').animate({scrollTop: $('.main__center')[0].scrollHeight});
      $('.text__btn').prop('disabled', false);
    })
    .fail(function(data) {
      alert('errer');
    })

    .always(function(data) {
     $('.text__btn').prop('disabled', false);
    })
  });

  var interval = setInterval (function(){
    if(window.location.href.match(/\/groups\/\d+\/messages/)){
      var m_id = $('.message:last').data('message-id') || 0

    $.ajax({
      url: location.href,
      type: 'GET',
      data: {id: m_id},
      dataType: 'json',
    })

    .done(function(data) {
      var id = $('.message').data('message-id')
      var insertHTML = '';
      data.forEach(function(message) {
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].
          scrollHeight});
        });
      })
      .fail(function(data) {
        alert('自動更新に失敗しました');
      });
    } else {
      clearInterval(interval);
    }}, 5000 );
});
