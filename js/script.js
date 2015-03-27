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
function fixedHeader(){
	if($(window).width() > 1040){
		myScroll > 100 ? header.addClass('on') : header.removeClass('on');
	}
}

// Animations au scroll //
function scrollPage(){
	myScroll = $(document).scrollTop();

	fixedHeader();

	requestAnimFrame(scrollPage);

	/*function scrollEvent(){
		myScroll = $(document).scrollTop();
		if (myScroll>100) {
			$("#header").addClass("on");
		} else {
			$("#header").removeClass("on");
		}
		$("#bg").css("top",-Math.ceil(myScroll/2.2));
		$("#triangle1").css("margin-top",-Math.ceil(myScroll/6));
		$("#accroche").css("top",-Math.ceil(myScroll/2));
		requestAnimFrame(function(){
			scrollMenu();
		});
	}*/
}

// Sous menu //
function setSubMenu(){
	if($(window).width() > 1040){
		$('.hasSubMenu').on('mouseover', function(){
			$(this).addClass('actifHover');
		}).on('mouseout', function(){
			$(this).removeClass('actifHover');
		});
	}
}

// Menu responsive //
function responsiveMenu(){
	if(!$(this).hasClass('actif')){
		$(this).css({opacity: 0}).delay(50).animate({opacity: 1}, 250);
	}
	$(this).toggleClass('actif');
	header.toggleClass('menuVisible');
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
		slider = sliders.eq(numSlider), contactFooter = $('.contactFooter');

	$(this).addClass('actif').parents('li').siblings().find('button').removeClass();

	if(numSlider === 0){
		contactFooter.addClass('bleu').removeClass('rose').removeClass('rouge').removeClass('vert');
	}else if(numSlider === 1){
		contactFooter.addClass('rouge').removeClass('rose').removeClass('bleu').removeClass('vert');
	}else if(numSlider === 2){
		contactFooter.addClass('vert').removeClass('rose').removeClass('rouge').removeClass('bleu');
	}else if(numSlider === 3){
		contactFooter.addClass('rose').removeClass('bleu').removeClass('rouge').removeClass('vert');
	}

	if(!slider.hasClass('on')){
		slider.addClass('on').animate({opacity: 1}, 600).siblings('.slidesTeam').animate({opacity: 0}, 600).removeClass('on');
		setSliderTeam(slider);
	}
}

// Scroll to a la section suivante home //
function goToNextSection(){
	htmlBody.animate({scrollTop: $(this).parents('section').next('section').offset().top - 100}, 400);
}

// API Youtube //
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player1;

function onYouTubeIframeAPIReady() {
    player1 = new YT.Player('player-1');
}

// ScrollMagic
function scrollMagic(){
	var controller = new ScrollMagic();

	var trianglesFooterTopFonce = TweenMax.to([$("#triangle-footer-top-bleu-fonce"), $("#triangle-footer-bottom-bleu-clair")], 1.2, {rotation: "-3deg", force3D:true,lazy:true});
	var tiangleFooterTopClair = TweenMax.to($("#triangle-footer-top-bleu-clair"), 1.2, {rotation: "3deg", force3D:true,lazy:true});
	var tiangleFooterBottomBlanc = TweenMax.to($("#triangle-footer-bottom-blanc"), 1.2, {rotation: "-3deg", force3D:true,lazy:true});
	var tiangleMenuFooter = TweenMax.to($(".triangle-menu-footer"), 1.2, {rotation: "-3deg", y: "0px", opacity: "1", force3D:true,lazy:true});
	var scrollNext1= TweenMax.to($(".scrollNext1"), 1.2, {rotation: "-3deg", force3D:true,lazy:true});
	var scrollNext2= TweenMax.to($(".scrollNext2"), 1.2, {rotation: "-3deg", force3D:true,lazy:true});
	var scrollNext3= TweenMax.to($(".scrollNext3"), 1.2, {rotation: "-3deg", force3D:true,lazy:true});

	var whenInContainer = new ScrollScene({
		triggerElement: '.contactFooter',
		duration: $('.contactFooter').outerHeight(),
		offset: -300,
		loglevel: 3
	})
	.setTween(trianglesFooterTopFonce)
	.addTo(controller);

	var whenInContainer2 = new ScrollScene({
		triggerElement: '.contactFooter',
		duration: $('.contactFooter').outerHeight(),
		offset: -400,
		loglevel: 3
	})
	.setTween(tiangleFooterTopClair)
	.addTo(controller);

	var whenInContainer3 = new ScrollScene({
		triggerElement: '#container-3',
		duration: $('#container-3').outerHeight(),
		offset: 0,
		loglevel: 3
	})
	.setTween(tiangleFooterBottomBlanc)
	.addTo(controller);

	var whenInContainer4 = new ScrollScene({
		triggerElement: '.menuFooter',
		duration: $('.menuFooter').outerHeight(),
		offset: -300,
		loglevel: 3
	})
	.setTween(tiangleMenuFooter)
	.addTo(controller);

	var whenInContainer5 = new ScrollScene({
		triggerElement: '.scrollNext1',
		duration: $('.scrollNext1').outerHeight(),
		offset: -300,
		loglevel: 3
	})
	.setTween(scrollNext1)
	.addTo(controller);

	var whenInContainer6 = new ScrollScene({
		triggerElement: '.scrollNext2',
		duration: $('.scrollNext2').outerHeight(),
		offset: -300,
		loglevel: 3
	})
	.setTween(scrollNext2)
	.addTo(controller);

	var whenInContainer7 = new ScrollScene({
		triggerElement: '.scrollNext3',
		duration: $('.scrollNext3').outerHeight(),
		offset: -300,
		loglevel: 3
	})
	.setTween(scrollNext3)
	.addTo(controller);
}


/**** INIT ****/
$(function(){

	scrollPage();

	setSubMenu();

	$('#burger').on('click', responsiveMenu);

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

	// Btn video //
	$('#btn-video').on('click', function(){
		var tlVideo = new TimelineMax({onComplete:completeTlVideo});
		tlVideo.to($(".zone-txt-cover-video"), 0.2, {y: "100px", opacity: "0", ease:Cubic.easeInOut});
		tlVideo.to($(".bg-cover-video"), 0.5, {rotationZ:1, rotation:"-45deg", y: "-100%", transformOrigin:"left bottom", ease:Cubic.easeInOut});
		tlVideo.set($(".cover-video"), {display: "none"});
		return false;
	});
	function completeTlVideo(){
		if(!isMobile.phone){ player1.playVideo(); }
	}

	scrollMagic();

	$(window).load(function(){
		// Slider ref home //
		if($('#sliderRef').length){
			$('#sliderRef').contentcarousel({
				sliderSpeed		: 500,
				sliderEasing	: 'easeOutExpo',
				itemSpeed		: 500,
				itemEasing		: 'easeOutExpo',
				scroll			: 1	
			});
		}

		// Slider footer //
		if($('#sliderTeam').length){
			setSliderTeam($('.slidesTeam').eq(0));
		}
	});

    $(document).scroll(function(){
    	
    });

    $(window).resize(function(){
    	fixedHeader();
    	setSubMenu();

    	/*$('#sliderRef').contentcarousel({
    		sliderSpeed		: 500,
    		sliderEasing	: 'easeOutExpo',
    		itemSpeed		: 500,
    		itemEasing		: 'easeOutExpo',
    		scroll			: 1	
    	});*/
	});

});