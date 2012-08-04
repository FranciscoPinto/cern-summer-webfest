$(function(){
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
}); 
