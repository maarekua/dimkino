$(".show").click(function(){
  $(".test").show('slow');
});

$(".test").click(function(){
  $(".test").hide(350);
});

$('#manual-ajax').click(function(event) {
  event.preventDefault();
  $.get(this.href, function(html) {
    $(html).appendTo('body').modal({
        fadeDuration: 300
    });
  });
});