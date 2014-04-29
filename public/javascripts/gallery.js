function open(el) {

  $('.gallery .thumbnail').hide()
  image = el.children('img');
  marginLeft = image.css('margin-left');
  image.animate({'margin-left': '0'}, 'slow')
  el.show().animate({width: '100%'},'slow', function() { el.bind('click.close', function() { close($(this)); } )});

}

function close(el) {
  
  el.unbind('click.close')  
  $('.gallery .thumbnail').hide();
  el.children('img').animate({'margin-left': marginLeft}, 'slow');
  el.show().animate({width: '30%'},'slow', function() {
    $('.gallery .thumbnail').show();
  });

}


$(document).ready( function() {
  $('.gallery .thumbnail').bind('click.open' , function() { 
  
  })
})