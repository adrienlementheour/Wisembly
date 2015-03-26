/**** VARIABLES ****/
var myScroll,
	header = $('header'),
	htmlBody = $('html, body');


/**** FONCTIONS GENERIQUES ****/
window.requestAnimFrame = (function(){
   return  window.requestAnimationFrame       || 
           window.webkitRequestAnimationFrame || 
           window.mozRequestAnimationFrame    || 
           window.oRequestAnimationFrame      || 
           window.msRequestAnimationFrame     || 
           function(callback){
             window.setTimeout(callback, 1000/60);
           };
})();


/**** FONCTIONS SPECIFIQUES ****/

// Header fixe //
function scrollMenu(){
	myScroll > 100 ? header.addClass('on') : header.removeClass('on');
	requestAnimFrame(scrollMenu);
}

// Mise en place du slider //
function setSliderTeam(slider){
	var slides = slider.find('.slideTeam'), slidesLength = slides.length, i = 0, 
		pagination = $('.navTeam'), button = '<li><button>•</button></li>',
		sliders = $('.slidesTeam'), slidersLength = sliders.length, y = 0,
		btnActif;

	function letSlide(){
		var numSlide = $(this).parents('li').index();

		if(!slides.eq(numSlide).hasClass('on')){
			$(this).addClass('actif').parents('li').siblings().find('button').removeClass('actif');
			slides.eq(numSlide).addClass('on').animate({opacity: 1}, 600).siblings().animate({opacity: 0}, 600).removeClass('on');
		}
	}

	for(y; y<slidersLength; y++){
		if(!sliders.eq(y).hasClass('on')){
			sliders.eq(y).css('opacity', 0);
		}
	}

	pagination.html('');
	if(slidesLength > 1){
		for(i; i<slidesLength; i++){
			pagination.append(button);
			(!slides.eq(i).hasClass('on')) ? slides.eq(i).css('opacity', 0) : btnActif = i;
		}
	}

	// Changement de slides //
	pagination.find('button').eq(btnActif).addClass('actif');
	pagination.find('button').on('click', letSlide);
}

// Changement de slider //
function setSliderTeamProfil(){
	var numSlider = $(this).parents('li').index(), sliders = $('.slidesTeam'),
		slider = sliders.eq(numSlider);

	$(this).addClass('actif').parents('li').siblings().find('button').removeClass();

	if(!slider.hasClass('on')){
		slider.addClass('on').animate({opacity: 1}, 600).siblings('.slidesTeam').animate({opacity: 0}, 600).removeClass('on');
		setSliderTeam(slider);
	}
}

// Scroll to a la section suivante home //
function goToNextSection(){
	htmlBody.animate({scrollTop: $(this).parents('section').next('section').offset().top - 100}, 400);
}


/**** INIT ****/
$(function(){

	scrollMenu();

	// Btn demande de contact footer //
	$('#demandeContact').on('click', function(){
		$(this).animate({opacity: 0}, 200, function(){
			$(this).css('display', 'none');
			$('#contact, #bulle').addClass('visible');
		});
	});

	// Changement de slider au clic btn footer (entreprise, agence, etc...) //
	$('.buttonsTeam').find('button').on('click', setSliderTeamProfil);

	// Petites fleches page accueil //
	$('.scrollNext').on('click', goToNextSection);

	$(window).load(function(){
		// Slider footer //
		if($('#sliderTeam').length){
			setSliderTeam($('.slidesTeam').eq(0));
		}
	});

    $(document).scroll(function(){
    	myScroll = $(document).scrollTop();
    });

    $(window).resize(function(){
	});

});