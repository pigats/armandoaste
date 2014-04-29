Image = (function() {
  function Image(fullres_src, thumb_src) {
    this.thumb_src = thumb_src;
    this.fullres_src = fullres_src;
    this.fullres_dom;
    this.is_loaded = false;
  }
  Image.prototype.load = function(callback) {
    if (!this.is_loaded) {
      this.fullres_dom = $('<img>')
      __this = this;
      this.fullres_dom.load( function() { __this.is_loaded = true; if(typeof(callback) != 'undefined') { callback() } });
      this.fullres_dom.attr('src', this.fullres_src);
    } else {
      callback();
    }
  }
  return Image;
})();


Gallery = (function() {
  function Gallery(images, canvas) {
    this.canvas = canvas;
    this.is_fullscreen = false;
    this.current_image_index = 0;
    this.images = [];
    for(i=0; i<images.length; i++) {
      this.images[i] = new Image(images[i]['fullres_src'], images[i]['thumb_src']);
    }
    //this.render();
  }
  
  Gallery.prototype.toggle_fullscreen = function() {
    if (this.is_fullscreen) {
      $('body').removeClass('is-gallery-fullscreen');
      this.canvas.parent().removeClass('is-gallery-fullscreen');
      this.is_fullscreen = false;
    } else { 
      $('body').addClass('is-gallery-fullscreen');
      this.is_fullscreen = true;
      _this = this
      window.setTimeout(function() { _this.canvas.parent().addClass('is-gallery-fullscreen'); }, 1000);
      //this.preload();
    }
  }

  Gallery.prototype.preload = function() {
    for(i=0; i<this.images.length; i++) {
      this.images[i].load();
    }
  }

  Gallery.prototype.move = function(direction) {
    var addend = 0;
    switch(direction) {
      case 'next'     : addend = 1; break;
      case 'previous' : addend = -1; break;
    }
    var next_image_index = this.current_image_index + addend;
    console.log(this.current_image_index)
    if (next_image_index >= 0 && next_image_index < images.length) {
      this.render(this.current_image_index + addend);
    } else {
      return false;
    }
  }

  Gallery.prototype.next = function() { this.move('next') }
  Gallery.prototype.previous = function() { this.move('previous') }


  Gallery.prototype.render = function(image_index) {
    if (typeof(image_index) == 'undefined' ) { image_index = 0 }
    $('body').addClass('is-gallery-loading');
    _this = this;
    this.images[image_index].load( function() {
      _this.canvas.fadeOut(100, function() { _this.canvas.attr('src', _this.images[image_index]['fullres_src']).fadeIn(100) });
      _this.current_image_index = image_index;
      $('body').removeClass('is-gallery-loading');
    })
  }

  return Gallery;
})();


$(document).ready(function() {
  $('#header-nav-subnav a').tooltip( {placement: 'bottom'} )
  active = $('#header-nav-subnav a.active')
  active.tooltip('show')
  $('#header-nav-subnav a:not(.active)').mouseenter( function() { active.tooltip('hide') })
  $('#header-nav-subnav').mouseout(function() { active.tooltip('show') })        
});