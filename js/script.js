/**** VARIABLES ****/
var myScroll,
	header = $('header'),
	htmlBody = $('html, body'),
	body = $("body"),
	burger = $('#burger');


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

$.fn.isOnScreen = function(){
    var win = $(window);
    
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
    
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};


/**** FONCTIONS SPECIFIQUES ****/

// Header fixe //
function fixedHeader(){
	if($(window).width() > 1040 && !isMobile.any){
		myScroll > 100 ? header.addClass('on') : header.removeClass('on');
	}
}

function apparitionFooter(){
	if(!isMobile.any){
		$('.navFooter').isOnScreen() ? TweenMax.set($(".rsFooter"), {visibility:"visible"}) : TweenMax.set($(".rsFooter"), {visibility:"hidden"});
	}
}

// Animations au scroll //
function scrollPage(){
	myScroll = $(document).scrollTop();

	fixedHeader();
	apparitionFooter();

	if(body.hasClass("home") && !$("html").hasClass("lt-ie10")){
		if(!isMobile.any){
			if(myScroll<$(".headHome").height()){
				TweenMax.set($("#bgHeadHome"), {y:-(myScroll/1.5)+"px"});
			}
		}
	}

	requestAnimFrame(scrollPage);
}

// Sous menu //
function setSubMenu(){
	var subMenus = $('.subMenu');

	if($(window).width() > 1040){
		$('.hasSubMenu').on('mouseover', function(){
			$(this).addClass('actifHover');
		}).on('mouseout', function(){
			$(this).removeClass('actifHover');
		});

		if(!$('html').hasClass('lt-ie9')){
			var nbSubMenus = subMenus.length, i = 0, y,
				liens, liensLength, widthLi, widthSubMenu, middleSubMenu,
				hasSubMenu, middleHasSubMenu, posHasSubMenu, newPosSubMenu;

			for(i; i<nbSubMenus; i++){
				liens = subMenus.eq(i).find('li');
				liensLength = liens.length;
				y = 0; 
				widthSubMenu = 0;

				for(y; y<liensLength; y++){
					widthSubMenu += liens.eq(y).outerWidth();
				}
				
				middleSubMenu = widthSubMenu / 2;
				hasSubMenu = subMenus.eq(i).parents('.hasSubMenu');
				middleHasSubMenu = hasSubMenu.outerWidth() / 2;
				posHasSubMenu = hasSubMenu.offset().left;

				newPosSubMenu = (middleHasSubMenu + posHasSubMenu) - middleSubMenu;
				subMenus.eq(i).css('padding-left', newPosSubMenu + 'px');
			}
		}
	}else{
		$('.hasSubMenu').unbind();
		if(!$('html').hasClass('lt-ie9')){
			$('.subMenu').css('padding-left', 0);
		}
	}
}

function hoverMenu(){
	$('.menu').find('li').on('mouseover', function(){
		TweenMax.to($("#triangle-top-header"), 0.2, {css:{y: "-60px", force3D:true}});
	}).on('mouseout', function(){
		TweenMax.to($("#triangle-top-header"), 0.2, {css:{y: "0px", force3D:true}});
	});
}


// Menu responsive //
function responsiveMenu(){
	var height = $(window).height() - header.height(),
		container = $('#container');
	if(!burger.hasClass('actif')){
		burger.css({opacity: 0}).delay(10).animate({opacity: 1}, 100);
		height > 340 ? container.height(height) : container.height('340px');
		container.css('overflow', 'hidden');
	}else{
		container.css({height: 'auto', overflow: 'visible'});
	}
	burger.toggleClass('actif');
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
			slides.eq(numSlide).siblings().stop().animate({opacity: 0, marginBottom: '-50px'}, 400, function(){
				slides.eq(numSlide).siblings().removeClass('on');
				slides.eq(numSlide).addClass('on').stop().animate({opacity: 1, marginBottom: 0}, 400);
			});
			
		}
	}

	for(y; y<slidersLength; y++){
		if(!sliders.eq(y).hasClass('on')){
			sliders.eq(y).css({opacity: 0, bottom: '-165px'});
		}
	}

	pagination.html('');
	if(slidesLength > 1){
		for(i; i<slidesLength; i++){
			pagination.append(button);
			(!slides.eq(i).hasClass('on')) ? slides.eq(i).css({opacity: 0, marginBottom: '-50px'}) : btnActif = i;
		}
	}

	// Changement de slides //
	pagination.find('button').eq(btnActif).addClass('actif');
	pagination.find('button').on('click', letSlide);
}

// Changement de slider //
function setSliderTeamProfil(that){
	var numSlider = that.parents('li').index(), sliders = $('.slidesTeam'),
		slider = sliders.eq(numSlider), contactFooter = $('.contactFooter');

	that.addClass('actif').parents('li').siblings().find('button').removeClass();

	if(!slider.hasClass('on')){
		slider.siblings('.slidesTeam').stop().animate({opacity: 0, bottom: '-165px'}, 400, function(){
			slider.siblings('.slidesTeam').removeClass('on');
			slider.addClass('on').stop().animate({opacity: 1, bottom: '-115px'}, 400);

			if(numSlider === 0){
				TweenLite.set($('#drag'), {x:0});
				contactFooter.addClass('bleu').removeClass('rose').removeClass('rouge').removeClass('vert');
			}else if(numSlider === 1){
				TweenLite.set($('#drag'), {x:130});
				contactFooter.addClass('rouge').removeClass('rose').removeClass('bleu').removeClass('vert');
			}else if(numSlider === 2){
				TweenLite.set($('#drag'), {x:235});
				contactFooter.addClass('vert').removeClass('rose').removeClass('rouge').removeClass('bleu');
			}else if(numSlider === 3){
				TweenLite.set($('#drag'), {x:334});
				contactFooter.addClass('rose').removeClass('bleu').removeClass('rouge').removeClass('vert');
			}

			setSliderTeam(slider);
		});
	}
}

function setDraggableButton(){
	$('#demandeContact').before("<div id='dragIn'><div id='drag'></div></div>");
	Draggable.create('#drag', {
		type: 'x', 
		bounds: $('#dragIn'),
		cursor: 'pointer',
		throwProps: true,
		snap: [0, 130, 235, 334],
		onThrowComplete: function(){
			var button;
			if(this.x == 0){
				button = $('.buttonsTeam').find('button').eq(0);
			}
			if(this.x == 130){
				button = $('.buttonsTeam').find('button').eq(1);
			}
			if(this.x == 235){
				button = $('.buttonsTeam').find('button').eq(2);
			}
			if(this.x == 334){
				button = $('.buttonsTeam').find('button').eq(3);
			}
			setSliderTeamProfil(button);
		}
	});
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

function videoCover(){
	function completeTlVideo(){
		if(!isMobile.phone){ player1.playVideo(); }
	}

	var tlVideo = new TimelineMax({onComplete:completeTlVideo});

	tlVideo.to($('.zone-txt-cover-video'), 0.2, {y: "100px", opacity: "0", ease:Cubic.easeInOut})
		   .to($(".bg-cover-video"), 0.5, {rotationZ:1, rotation:"-45deg", y: "-100%", transformOrigin:"left bottom", ease:Cubic.easeInOut})
		   .set($(".cover-video"), {display: "none"});

	return false;
}

function heightBgHeadHome(){
	//var newHeight = !isMobile.any ? $(".headHome").height()+"px" : $(".headHome").height() + 100 +"px";
	if(!isMobile.any){
		var newHeight = $(".headHome").height()+"px";
	}else{
		var newHeight = $(".headHome").height()  +"px";
	}
	TweenMax.set($("#bgHeadHome"), {height:newHeight});
}

// ScrollMagic
function scrollMagic(){
	if(($(window).width()>767)){
		var controller = new ScrollMagic();
		
		var triangleTopHeader = TweenMax.to($("#triangle-top-header"), 1.2, {css:{y: "0px", rotation: "0deg", force3D:true}});
		var triangleHeaderVert = TweenMax.to($("#triangle-header-vert"), 1.2, {css:{rotation: "7deg", force3D:true}});
		var triangleHeaderBlanc = TweenMax.to($("#triangle-header-blanc"), 1.2, {css:{rotation: "-3deg", force3D:true}});
		var trianglesFooterTopFonce = TweenMax.to($("#triangle-footer-top-bleu-fonce"), 1.2, {css:{rotation: "-3deg", force3D:true}});
		var tiangleFooterTopClair = TweenMax.to($("#triangle-footer-top-bleu-clair"), 1.2, {css:{rotation: "3deg", force3D:true}});
		var tiangleFooterBottomBleu = TweenMax.to($("#triangle-footer-bottom-bleu-clair"), 1.2, {css:{rotation: "-3deg", force3D:true}});
		var tiangleFooterBottomBlanc = TweenMax.to($("#triangle-footer-bottom-blanc"), 1.2, {css:{rotation: "-3deg", force3D:true}});
		var tiangleMenuFooter = TweenMax.to($(".triangle-menu-footer"), 1.2, {css:{rotation: "-3deg", y: "0px", opacity: "1", force3D:true}});
		var scrollNext1 = TweenMax.to($(".scrollNext1"), 1.2, {rotation: "-3deg", force3D:true,lazy:true});
		var scrollNext2 = TweenMax.to($(".scrollNext2"), 1.2, {rotation: "-3deg", force3D:true,lazy:true});
		var scrollNext3 = TweenMax.to($(".scrollNext3"), 1.2, {rotation: "-3deg", force3D:true,lazy:true});
		var barreFooter = TweenMax.to($(".barre-footer"), 1.2, {rotation: "-3deg", force3D:true,lazy:true});

		var sceneHeader = new ScrollScene({
			triggerElement: '.headHome',
			duration: $('.headHome').outerHeight()/3,
			offset: 500
		})
		.setTween(triangleHeaderVert)
		.addTo(controller);

		var sceneHeader = new ScrollScene({
			triggerElement: '.headHome',
			duration: $('.headHome').outerHeight()/3,
			offset: 500
		})
		.setTween(triangleHeaderBlanc)
		.addTo(controller);

		var whenInContainer = new ScrollScene({
			triggerElement: '.contactFooter',
			duration: $('.contactFooter').outerHeight(),
			offset: -300
		})
		.setTween(trianglesFooterTopFonce)
		.addTo(controller);

		var whenInContainer2 = new ScrollScene({
			triggerElement: '.contactFooter',
			duration: $('.contactFooter').outerHeight(),
			offset: -400
		})
		.setTween(tiangleFooterTopClair)
		.addTo(controller);

		var whenInContainer3Bis = new ScrollScene({
			triggerElement: '#container3',
			duration: $('#container3').outerHeight(),
			offset: -400
		})
		.setTween(tiangleFooterBottomBleu)
		.addTo(controller);

		var whenInContainer3 = new ScrollScene({
			triggerElement: 'body',
			duration: $('#container3').outerHeight(),
			offset: $(document).height() - $(window).height() + $('#container3').height() - 50 /* CE massacre est entièrement de ta faute */
		})
		.setTween(tiangleFooterBottomBlanc)
		.addTo(controller);

		var whenInContainer4 = new ScrollScene({
			triggerElement: '.menuFooter',
			duration: $('.menuFooter').outerHeight(),
			offset: -300
		})
		.setTween(tiangleMenuFooter)
		.addTo(controller);

		var whenInContainer5 = new ScrollScene({
			triggerElement: '.scrollNext1',
			duration: 200,
			offset: -300
		})
		.setTween(scrollNext1)
		.addTo(controller);

		var whenInContainer6 = new ScrollScene({
			triggerElement: '.scrollNext2',
			duration: 200,
			offset: -300
		})
		.setTween(scrollNext2)
		.addTo(controller);

		var whenInContainer7 = new ScrollScene({
			triggerElement: '.scrollNext3',
			duration: 200,
			offset: -300
		})
		.setTween(scrollNext3)
		.addTo(controller);

		var whenInContainer8 = new ScrollScene({
			triggerElement: '.navFooter',
			duration: $('.rsFooter').height(),
			offset: -50
		})
		.setTween(barreFooter)
		.addTo(controller);
	}
}


/**** INIT ****/
$(function(){

	scrollPage();

	setSubMenu();
	hoverMenu();

	if(!isMobile.any){
		$("html").addClass("no-mobile");
	}
	if(body.hasClass("home") && !$("html").hasClass("lt-ie10")){
		if(!isMobile.any){
			TweenMax.set($("#bgHeadHome"), {position:"fixed"});
		}
		TweenMax.set($("#bgHeadHome"), {height:$(".headHome").height()+"px"});
	}

	if(body.hasClass("home")){
    	heightBgHeadHome();
    }

	burger.on('click', responsiveMenu);
	$('#triangleMenu').on('click', function(){
		burger.removeClass('actif');
		header.removeClass('menuVisible');
		$('#container').css({height: 'auto', overflow: 'visible'});
	});

	// Btn demande de contact footer //
	$('#demandeContact').on('click', function(){
		$(this).animate({opacity: 0}, 250, function(){
			$(this).css('display', 'none');
			$('#contact, #bulle').delay(10).addClass('visible');
			$('#nom').focus();
		});
		if($('html').hasClass('lt-ie9')){
			$('#sliderTeam').height('500px');
		}
	});

	// Changement de slider au clic btn footer (entreprise, agence, etc...) //
	$('.buttonsTeam').find('button').on('click', function(){ setSliderTeamProfil($(this)); });
	if($(window).width() > 450 && !$('html').hasClass('lt-ie9')) setDraggableButton();

	// Petites fleches page accueil //
	$('.scrollNext').on('click', goToNextSection);

	// Btn video //
	$('#btn-video').on('click', videoCover);
	

	$(window).load(function(){
		scrollMagic();

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
    	if(body.hasClass("home")){
	    	heightBgHeadHome();
	    }
	    if(header.hasClass('menuVisible')){
	    	responsiveMenu();
	    }
	});

});