$('#contacts-btn').click(function(event) {
  event.preventDefault();
  $.get(this.href, function(html) {
    $(html)
      .appendTo('footer')
      .modal({
        fadeDuration: 150
      });
  });
});