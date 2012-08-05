function set_sliders(){
  var slider = $('#slider').bxSlider({
    controls: false,
		easing: 'easeInOutCubic'
		//mode: 'fade'
  });

  $('#go-prev').click(function(){
    slider.goToPreviousSlide();
    return false;
  });

  $('#go-next').click(function(){
    slider.goToNextSlide();
    return false;
  });

	$(document).keydown(function(e){
		if (e.keyCode == 37) { 
			slider.goToPreviousSlide();
			return false;
		}

		if (e.keyCode == 39) {
			slider.goToNextSlide();
			return false;
		}
	});

} 
