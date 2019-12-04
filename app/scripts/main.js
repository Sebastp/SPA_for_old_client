function navBack(){
  var scrolled = $(window).scrollTop();
  if (scrolled>0) {
    $('nav').addClass('active');
  }else {
    $('nav').removeClass('active');
  }
}

$(function(){
  navBack();

$(window).scroll(function(){
  navBack()
});

$('.pr-item--down__like').click(function() {
  if ($(this).attr('src')== "img/icons/like.svg") {
    $(this).attr('src', 'img/icons/like_full.svg');
  }else {
    $(this).attr('src', "img/icons/like.svg")
  }
});


});
