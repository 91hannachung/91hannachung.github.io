$(document).ready(function(){
	$('.about').click(function(){
		$('html, body').animate({scrollTop : $('#about').offset().top}, 1000);
		return false;
	});
	$('.icando').click(function(){
		$('html, body').animate({scrollTop : $('#icando').offset().top}, 1000);
		return false;
	});
	$('.portfolio').click(function(){
		$('html, body').animate({scrollTop : $('#portfolio').offset().top}, 1000);
		return false;
	});
	$('.sns').click(function(){
		$('html, body').animate({scrollTop : $('#sns').offset().top}, 1000);
		return false;
	});
});

