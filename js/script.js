/*						Popup
-----------------------------------------------------------*/
$('[data-popup]').click(function(){
	popupOpen($(this).attr('data-popup'))
});
$(document).keyup(function(d){
	if (d.keyCode == 27) {
		popupClose();
	}
});
$(document).on('click','.popup-close,.layout-overlay',function(){
	popupClose()
});
function popupOpen(popupName){
	var shift = $(window).width();
	$('body').addClass('lock');
	shift -= $(window).width();
	$('body').css({'margin-left':shift});
	$('.popup').hide();
	$('.layout,.popup-'+popupName).fadeIn();
	return false;
}
function popupClose(){
	$('body').removeClass('lock');
	$('body').css({'margin-left':0});
	$('.layout,.popup').fadeOut();
	return false;
}

/*						Search
-----------------------------------------------------------*/
$('.search-link').click(function(){
	$(this).toggleClass('active');
	$(this).toggleClass('open');
	return false;
});

/*						Carousel
-----------------------------------------------------------*/
var isSliding = false;
$('.carousel-right,.carousel-left').click(function(){ 
	var carousel = $(this).parents('.carousel');
	var way = 'right';
	if($(this).hasClass('carousel-left')){
		way = 'left';
	}
	carouselTo(carousel,way);
	console.log();
	return false;
});

function carouselTo(carousel,way){
	if(!isSliding){
		var slide_width = $(carousel).find('li').outerWidth(true);
		var first_slide = $(carousel).find('li:first-child');
		var last_slide = $(carousel).find('li:last-child');
		var carousel_list = $(carousel).find('ul');
		isSliding = true;
		if(way==='left'){
			carousel_list.css('margin-left','-='+slide_width);
			first_slide.before( last_slide.clone(true) );
			carousel_list.animate({marginLeft:'+='+slide_width},300,function(){
				endSliding(last_slide);
			});
		}else{
			last_slide.after( first_slide.clone(true) );
			carousel_list.animate({marginLeft:'-='+slide_width},300,function(){
				endSliding(first_slide);
				carousel_list.css('margin-left','');
			});
		}
	}
	function endSliding(toRemove){
		toRemove.remove();
		isSliding = false;
		return false;
	}
}

/*						Slider
-----------------------------------------------------------*/
$(document).on('click','.slider .switch div',function(){
	slideTo($(this).index());
});
$(document).on('click','.slider-left',function(){
	slideTo($('.slider > ul > li.active').index()-1);
});
$(document).on('click','.slider-right',function(){
	slideTo($('.slider > ul > li.active').index()+1);
});
window.onload = function(){
	sliderSetting();
	setTimeout(function(){
		autoSlide();
	},10000);
}
function slideTo(index){
	var n = $('.slider img').length;
	if(index>=n){
		index = 0;
	}
	if(index<0){
		index = n-1;
	}
	$('.slider > ul > li').eq(index).addClass('active').siblings().removeClass('active');
	$('.slider .switch div').eq(index).addClass('active').siblings().removeClass('active');
}
function sliderSetting(){
	for(var i = 0; i < $('.slider > ul > li').length; i++){
		if(i===0){
			$('<div class="active"></div>').appendTo('.slider .switch');
		}else{
			$('<div></div>').appendTo('.slider .switch');
		}
	}
	$('.slider .switch div,.slider > ul > li').eq(0).addClass('active').siblings().removeClass('active');
}
function autoSlide(){
	var index = $('.slider > ul > li.active').index() + 1;
	slideTo(index);
	setTimeout('autoSlide()',10000);
}