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
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
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
  })
})

