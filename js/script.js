/**** VARIABLES ****/
var myScroll,
	body = $("body"),
	header = body.hasClass('success') ? $('#header') : $('header'),
	htmlTag = $('html'),
	htmlBody = $('html, body'),
	burger = $('#burger'),
	bgHead = $('#bgHead'),
	btnContact = $('#demandeContact'),
	minHeight = $('.menu').innerHeight() - 10,
	subMenus = $('.menu').find('.sub-menu'),
	avancementLeft = 0,
	avancementLeftFuture = 0,
	precWidth = 0,
	hasDemiBefore = false,
	avancementLeftBottom = 0,
	scrollTop = $('#scrollTop'),
	blogWisemblyTop,
	btnTripColor = $('.navTrip').find('a').css('color');


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
    var win = $(window),
    	viewport = {
        	top : win.scrollTop(),
        	left : win.scrollLeft()
    	},
    	bounds = this.offset();

    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
    
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

$.urlParam = function(name){
    var params = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href),
    	results = params == null ? null : params[1] || 0;
    return results;
}

function shuffle(array) {
  var elementsRemaining = array.length, temp, randomIndex;
  while (elementsRemaining > 1) {
    randomIndex = Math.floor(Math.random() * elementsRemaining--);
    if (randomIndex != elementsRemaining) {
      temp = array[elementsRemaining];
      array[elementsRemaining] = array[randomIndex];
      array[randomIndex] = temp;
    }
  }
  return array;
}

function isValidEmail(email) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(email);
}

function isValidTel(n){
  var pattern = new RegExp(/^\+?[^.\-][0-9\.\- ]+$/);
  return pattern.test(n);
}

filterInt = function (value) {
  if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) return Number(value);
  return 0;
}

/**** WIZ ****/
var joinAnEvent = {
	$el: $('[data-name=join_an_event]'),
	keywordExists: false,

	startListening: function () {
		this.$el.find('input').on('keyup', $.proxy(this.checkKeyword, this));
		this.$el.on('submit', $.proxy(this.goTo, this));
	},

	checkKeyword: function (e) {
		var valLength = this.$el.find('input').val().length;
		if (3 > valLength || 20 < valLength) {
			if (3 > valLength) return this.$el.attr('data-status', 'active');
			this.keywordExists = false;
			this.updateStatus();
			return;
		}

		var keyword = $(e.currentTarget).val();
		this.getEvent(keyword)
			.success($.proxy(function () {
				this.keywordExists = true;
				this.updateStatus();
				delete this.xhr;
			}, this))
			.fail($.proxy(function (jqXHR) {
				this.keywordExists = (404 !== jqXHR.status);
				this.updateStatus();
				delete this.xhr;
			}, this));
	},

	getEvent: function (keyword) {
		if (this.xhr) this.xhr.abort();
		return this.xhr = $.ajax({ url: 'https://api.wisembly.com/api/4/event/' + keyword || '', dataType: 'json' });
	},

	goTo: function (e) {
		e.preventDefault();
		if (!this.keywordExists) return;
		window.open('https://app.wisembly.com/' + this.$el.find('input').val());

		/* GTM */
		dataLayer.push({
			'keywordWiz': this.$el.find('input').val(),
			'event': 'wiz_search' 
		});
	},

	updateStatus: function () {
		this.$el.attr('data-status', this.keywordExists ? 'valid' : 'not-valid');
	}
};


/**** FONCTIONS SPECIFIQUES ****/

// API Youtube //
var tag = document.createElement('script'), player1;
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady(){
    player1 = new YT.Player('player-1');
}

// Header fixe //
function fixedHeader(){
	if($(window).width() > 1040 && !isMobile.any){
		myScroll > 100 ? header.addClass('on') : header.removeClass('on');
	}
}

// Apparition subMenu //
function appearSubMenu(){
	var pageSubMenu =  $('.menu').find('.current_page_parent');
	if(pageSubMenu.length){
		if($(window).width() > 1040){
			myScroll > 100 ? pageSubMenu.removeClass('openSubMenu') : pageSubMenu.addClass('openSubMenu');
		}else{
			pageSubMenu.removeClass('openSubMenu');
		}	
	}

	requestAnimFrame(appearSubMenu);
}

// Appartition footer social //
function apparitionFooter(){
	if(!isMobile.any){
		if($('.navFooter').length){
			$('.navFooter').isOnScreen() ? TweenMax.set($(".rsFooter"), {visibility:"visible"}) : TweenMax.set($(".rsFooter"), {visibility:"hidden"});
		}
		if(body.hasClass('success') && body.hasClass('home')){
			!$('.head').isOnScreen() ? TweenMax.set($(".rsFooter"), {visibility:"visible"}) : TweenMax.set($(".rsFooter"), {visibility:"hidden"});
		}
	}
}

// Animations au scroll //
function scrollPage(){
	var head = $('.head');
	myScroll = $(document).scrollTop();

	if(!body.hasClass('landing')){
		if(!body.hasClass('blog') && !body.hasClass('success')){
			fixedHeader();
		}
		apparitionFooter();
	}

	if(!htmlTag.hasClass("lt-ie10") && !isMobile.any && myScroll < head.height() && $(window).width() > 767 && !body.hasClass('blog') && !head.hasClass('none')){
		TweenMax.set(bgHead, {y:-(myScroll/1.5)+"px"});
		if(!body.hasClass('success')){
			TweenMax.set(head.find('.content'), {y:+(myScroll/2.5)+"px"});
		}
	}

	if(scrollTop.length){
		myScroll > 1000 ? scrollTop.addClass('on') : scrollTop.removeClass('on');
	}

	if($('#slider-anim-visez-juste').length){
		appartitionAnimsSliders();
	}

	if(body.hasClass('blog')){
		if(!isMobile.any && $('.blogWisembly').length){
			var blogWisembly = $('.blogWisembly');
			if($('.sidebar').innerHeight() < $('.blogMain').innerHeight() && blogWisembly.outerHeight(true) + 50 < $(window).height()){
				if(myScroll >= blogWisemblyTop && myScroll <= $('footer').offset().top - blogWisembly.height() - 130){				
					blogWisembly.addClass('fixed');
				}else{
					blogWisembly.removeClass('fixed');
				}
			}
			
		}

		if($(window).width() > 1040){
			myScroll > 100 ? $('#popupBlog').addClass('scrolled') : $('#popupBlog').removeClass('scrolled');
		}

	}

	requestAnimFrame(scrollPage);
}

function setActiveMenu(){
	var menu = $('#menu-menu-principal'), 
		current = menu.find('> li.current-menu-item'),
		currentParent = menu.find('.current_page_parent');

	if( current.length ){
		current.siblings().find('a').addClass('notActive');
	}
	else if( currentParent.length ){
		currentParent.siblings().find('a').addClass('notActive');
	}else{
		menu.find('a').removeClass('notActive');
	}
}

// Sous menu //
function setSubMenu(){
	var hasMenu = $('.hasSubMenu');

	if($(window).width() > 1040){
		hasMenu.on('mouseover', function(){
			$(this).addClass('actifHover');
		}).on('mouseout', function(){
			$(this).removeClass('actifHover');
		});
	}else{
		hasMenu.unbind();
	}
}

function centerSubMenu(){
	if(!htmlTag.hasClass('lt-ie9')){
		if($(window).width() > 1040){
			var nbSubMenus = subMenus.length, i = 0, y,
				liens, liensLength, widthSubMenu, middleSubMenu,
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

				widthSubMenu + newPosSubMenu >= $(window).width() ? subMenus.eq(i).css('paddingLeft', 0) : subMenus.eq(i).css({'paddingLeft': newPosSubMenu + 'px', 'text-align': 'left'});
			}
		}else{
			subMenus.css('paddingLeft', 0);
		}
	}

	appearSubMenu();
}

// Sélecteur de langue header //
function langSelector(){
	var menuLang = $('.lang'), actifLi = menuLang.find('.actif');
	menuLang.prepend(actifLi).find('.actif').eq(1).remove();
}

// Gérer la position du bouton "je suis intéressé" et du texte "contactez-nous" dans le menu responsive //
function setPosBtnMenu(){
	var btn = $('#contact-topbar'), txt = $('.topHeader').find('p');
	if(btn.length && txt.length){
		if($(window).width() < 1040){
			btn.css('top', minHeight);
			txt.css('top', minHeight + 80);
		}else{
			btn.css('top', 0);
			txt.css('top', 0);
		}
	}
}

// Menu responsive //
function responsiveMenu(){
	var height = $(window).height() - header.height(),
		container = $('#container');

	setPosBtnMenu();

	if(!burger.hasClass('actif')){
		burger.css({opacity: 0}).delay(10).animate({opacity: 1}, 100);

		if( height > minHeight ){
			container.height(height);
		}else{
			htmlTag.hasClass('home') ? container.height(minHeight) : container.height(minHeight + 100);
		}
		container.css('overflow', 'hidden');

	}else{
		container.css({height: 'auto', overflow: 'visible'});
	}
	burger.toggleClass('actif');
	header.toggleClass('menuVisible');
}

// Mise en place du slider du footer //
function setSliderTeam(slider){
	var slides = slider.find('.slideTeam'), slidesLength = slides.length, i = 0, 
		pagination = $('.navTeam'), button = '<li><button>•</button></li>',
		sliders = $('.slidesTeam'), slidersLength = sliders.length, y = 0,
		btnActif, rand = Math.floor(Math.random()*slidesLength);

	function letSlide(){
		var numSlide = $(this).parents('li').index();

		if(!slides.eq(numSlide).hasClass('on')){
			$(this).addClass('actif').parents('li').siblings().find('button').removeClass('actif');
			slides.eq(numSlide).siblings().stop().animate({opacity: 0, marginBottom: '-25px'}, 400, function(){
				slides.eq(numSlide).addClass('on').stop().animate({opacity: 1, marginBottom: 0}, 400).siblings().removeClass('on');
			});
		}

		// Récupérer le nom de la personne //
		$('#nomContact').attr('value', slides.eq(numSlide).find('strong').html());
	}

	for(y; y<slidersLength; y++){
		if(!sliders.eq(y).hasClass('on')){
			sliders.eq(y).css({opacity: 0, bottom: '-140px'});
		}
	}

	slides.removeClass('on').eq(rand).addClass('on').stop().animate({opacity: 1, marginBottom: 0}, 400);
	pagination.html('');
	if(slidesLength > 1){
		for(i; i<slidesLength; i++){
			pagination.append(button);
			!slides.eq(i).hasClass('on') ? slides.eq(i).css({opacity: 0, marginBottom: '-25px'}) : btnActif = i;
		}
	}

	// Récupérer le nom de la personne //
	$('#nomContact').attr('value', slides.eq(rand).find('strong').html());

	// Changement de slides //
	pagination.find('button').eq(btnActif).addClass('actif');
	pagination.find('button').on('click', letSlide);
}

// Changement de slider //
function setSliderTeamProfil(that){
	var numSlider = that.parents('li').index(), sliders = $('.slidesTeam'),
		slider = sliders.eq(numSlider), contactFooter = $('.contactFooter'),
		pos2 = 130, pos3 = 235, pos4 = 334;

	if(body.hasClass('en')){
		pos2 = 121; 
		pos3 = 233;
		pos4 = 337;
	}

	that.addClass('actif').parents('li').siblings().find('button').removeClass();

	if(!slider.hasClass('on')){
		slider.siblings('.slidesTeam').stop().animate({opacity: 0, bottom: '-140px'}, 400, function(){
			slider.addClass('on').stop().animate({opacity: 1, bottom: '-115px'}, 400).siblings('.slidesTeam').removeClass('on');

			switch(numSlider){
				case 0:
					TweenLite.set($('#drag'), {x:0});
					contactFooter.addClass('bleu').removeClass('rose rouge vert');
					break;
				case 1:
					TweenLite.set($('#drag'), {x:pos2});
					contactFooter.addClass('rouge').removeClass('rose bleu vert');
					break;
				case 2:
					TweenLite.set($('#drag'), {x:pos3});
					contactFooter.addClass('vert').removeClass('rose rouge bleu');
					break;
				case 3:
					TweenLite.set($('#drag'), {x:pos4});
					contactFooter.addClass('rose').removeClass('bleu rouge vert');
					break;
			}
		});
		setSliderTeam(slider);
	}

	// Récupérer la valeur du name et l'appliquer au select "profil" //
	$('#profil').find('option[value='+ that.attr('name') +']').prop('selected', true);

	// Changement du champ entreprise //
	var label = that.html() === 'Autre' ? 'Organisation' : that.html();
	$('#labelEnt').html(label + ' *');

	// Récupérer le nom de la personne //
	$('#nomContact').attr('value', slider.find('.slideTeam.on').find('strong').html());
}

// Apparition du slider permettant de chosir son profil //
function setDraggableButton(){
	var buttons = $('.buttonsTeam').find('button'), pos2 = 130, pos3 = 235, pos4 = 334;

	if(body.hasClass('en')){
		pos2 = 121; 
		pos3 = 233;
		pos4 = 337;
	}

	btnContact.before("<div id='dragIn'><div id='drag'></div></div>");
	Draggable.create('#drag', {
		type: 'x', 
		bounds: $('#dragIn'),
		cursor: 'pointer',
		throwProps: true,
		snap: [0, pos2, pos3, pos4],
		throwResistance: 5000,
		maxDuration: 3,
		onThrowComplete: function(){
			var button;

			switch (this.x){
				case 0:
					button = buttons.eq(0);
					break;
				case pos2:
					button = buttons.eq(1);
					break;
				case pos3:
					button = buttons.eq(2);
					break;
				case pos4:
					button = buttons.eq(3);
					break;
			}

			setSliderTeamProfil(button);
		}
	});
}

// Ouverture du formulaire de contact du footer //
function openForm(){
	if(btnContact.length){
		btnContact.animate({opacity: 0}, 200, function(){
			btnContact.css('display', 'none');
			$('#formContact, #bulle').addClass('visible');
			setTimeout(function(){ htmlBody.animate({scrollTop: $('#formContact').offset().top - 250}, 400, 'easeInOutCubic'); }, 300);
			$('#nom').focus();
		});
	}else{
		setTimeout(function(){ htmlBody.animate({scrollTop: $('.formContact').offset().top - 200}, 500, 'easeInOutCubic'); }, 300);
	}
}

// ScrollMagic ( triangle footer + header )
function scrollMagic(){
	if( $(window).width() > 767 ){
		var controller = new ScrollMagic(), triangleTopHeader, tiangleMenuFooter, whenInContainer4;

		if($("#triangle-top-header").length){
			triangleTopHeader = TweenMax.to($("#triangle-top-header"), 1.2, {css:{y: "0px", rotation: "0deg", force3D:true}});
		}
		if($(".triangle-menu-footer").length){
			tiangleMenuFooter = TweenMax.to($(".triangle-menu-footer"), 1.2, {css:{rotation: "-3deg", y: "0px", opacity: "1", force3D:true}});
			whenInContainer4 = new ScrollScene({
				triggerElement: '.menuFooter',
				duration: $('.menuFooter').outerHeight(),
				offset: -300
			}).setTween(tiangleMenuFooter).addTo(controller);
		}
	}
}

// Scroll to section suivante //
function goToNextSection(){
	htmlBody.animate({scrollTop: $(this).parents('.scrollHere').next().offset().top - 100}, 400);
}

// Réglage de la photo d'entête //
function heightBgHead(height){
	var head = $(".head"), newHeight = height ? height : 0;

	if(!head.hasClass('none')){
		if($(window).width() > 767){
			if(!htmlTag.hasClass("lt-ie9") && !isMobile.any){
				TweenMax.set(bgHead, {position:"fixed"});
			}
			
			if(!height){
				newHeight = Math.ceil(head.height());
				newHeight = $(window).width() < 1041 && body.hasClass('success') ? newHeight + 90 : newHeight - 1;
			}

			TweenMax.set(bgHead, {height: newHeight+"px"});
		}else{
			TweenMax.set(bgHead, {position:"absolute"});
		}
	}
}

// Vidéo youtube //
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

// Logos presse aléatoire en page d'accueil //
function randomLogosPress(){
	var logos = $('.logosPresse').find('img'), logosLength = logos.length,  
		i = 0, nbLogos = 4, j = 0, tabRand = [];

	if(logosLength > nbLogos){
		for(j; j<logosLength; j++){ 
			tabRand[j] = j; 
		}
		shuffle(tabRand);

		logos.addClass('none');

		for(i; i<nbLogos; i++){
			logos.eq(tabRand[i]).removeClass('none');
		}
	}
}

// Filtres //
function goToContent(){
	setTimeout(function(){
		htmlBody.animate({scrollTop: $('.wrapper').offset().top - 100}, 400);
	}, 400);
}

function setMapSize(){
	$('#map').height($(window).height() - header.height());
}

function setToolTip(context){
	var links = context.find('.lien'), linksLength = links.length, i = 0, titles = [], linkOffset;

	if(links.attr('title') !== ''){

		for(i; i<linksLength; i++){
			titles[i] = links.eq(i).attr('title');
			links.eq(i).removeAttr('title').append("<span class='tooltip' class='none'>"  + titles[i] + "</span>");
		}

		links.on('mouseenter', function(){
			$(this).find('.tooltip').delay(300).removeClass('none');
		}).on('mouseleave', function(){
			setTimeout(function(){ $(this).find('.tooltip').addClass('none'); }, 300);
		});

		links.on('mousemove', function(e){
			linkOffset = $(this).offset();
			$(this).find('.tooltip').css({'top': e.pageY - linkOffset.top + 20, 'left': e.pageX - linkOffset.left - 20});
		});

	}
}

function setSliderHeight(sliders){

	function setHeight(context){
		var li = context.find('ul').eq(0).find('li'), liLength = li.length, i = 0, heightMaxLi = 0;

		for(i; i < liLength; i++){
			if (li.eq(i).height() > heightMaxLi){
				heightMaxLi = li.eq(i).height();
			}
		}

		context.find('ul').eq(0).css('height', heightMaxLi+"px");
	}

	var c = 0, carouselLength = sliders.length;
	for(c; c<carouselLength; c++){
		setHeight(sliders.eq(c));
	}
}

function initAnnonces(){
	TweenMax.set($(".whr-item"), {display:"block"});
}

/* Positionnement des images diapos dans la page Emploi */
function positionDiapos(){
	var slider = $("#slider-diapos"), slides = slider.find('li');

	slides.each(function(index){
		var thisWidth = $(this).find('img').width() + 10;
		if($(this).hasClass("half")){
			// Si l'image a une demi-hauteur
			if(precWidth !== 0){
				// Si l'image d'avant est en haut
				var newWidth = thisWidth;
				if(newWidth <= precWidth){
					// Si la nouvelle image n'est pas plus large que celle du haut
					TweenMax.set($(this), {top: "50%", left: avancementLeft+avancementLeftBottom+"px"});
					// Mise à jour du precWidth
					precWidth -= newWidth;
					hasDemiBefore = true;
					avancementLeftBottom += thisWidth;
				}else{
					// Si la nouvelle image est plus large que celle du haut
					avancementLeft += avancementLeftFuture;
					TweenMax.set($(this), {top: 0, left: avancementLeft+"px"});
					avancementLeftFuture = thisWidth;
					hasDemiBefore = false;
					avancementLeftBottom = 0;
				}
			}else{
				// Si l'image d'avant n'est pas en haut
				avancementLeft += avancementLeftFuture;
				TweenMax.set($(this), {top: 0, left: avancementLeft+"px"});
				precWidth = thisWidth;
				avancementLeftFuture = thisWidth;
				hasDemiBefore = false;
				avancementLeftBottom = 0;
			}
		}else{
			// Si l'image n'a pas une demi-hauteur
			// On met à jour l'avancement
			avancementLeft += avancementLeftFuture;
			avancementLeftFuture = 0;
			TweenMax.set($(this), {top: 0, left: avancementLeft+"px"});
			avancementLeft += thisWidth;
			hasDemiBefore = false;
			avancementLeftBottom = 0;
			precWidth = 0;
			hasDemiBefore = false;
		}
	});

	TweenMax.set(slider, {width: avancementLeft+avancementLeftFuture+"px"});
	Draggable.create("#slider-diapos", {type:"x", edgeResistance:0.65, bounds:"#container-slider-diapos", throwProps:true});

	if(slider.css('visibility') == 'hidden'){
		slider.css('visibility', 'visible');
	}
}


/**** SLIDER VALUES MISSION ****/

var unit = 200, // padding inclus
	unitNaked = 122, // padding non inclus
	bigUnitDelta = 338 - unit, // padding inclus
	bigUnit = 260, // padding non inclus
	total = 5,
	numActive = 3,
	spee = 0.4;


// taille du slider
function setSizeMission(){
	TweenMax.set($("#slider-txt-mission"), {width: $("#slider-visu-mission").find('li').length*$('#wrapper-slider-visu-mission').width()+"px"});
	TweenMax.set($("#slider-txt-mission").find('li'), {width: $('#wrapper-slider-visu-mission').width()+"px"});
	TweenMax.set($("#slider-visu-mission"), {width: $("#slider-visu-mission").find('li').length*unit+bigUnitDelta+"px"});
}

// on positionne 
function posSlideMission(){
	setSizeMission();
	var myIndex = $("#slider-visu-mission li.active").index()-2;
	TweenMax.set($("#slider-visu-mission"), {left:"50%", marginLeft: -myIndex*unit-(total*unit+bigUnitDelta)/2+"px", ease:Linear.easeIn});
	TweenMax.set($("#slider-txt-mission"), {marginLeft: -(myIndex+2)*$('#wrapper-slider-visu-mission').width()+"px", ease:Linear.easeIn});
}

// de temps en temps, supprimer qui ne servent à rien pour libérer le DOM
function purgeMission(){
	if ($("#slider-visu-mission li").length > 10) {
		// si on est vers la fin
		if ($("#slider-visu-mission").find('li.active').index()>5) {
			$("#slider-visu-mission").find('li').first().remove();
			$("#slider-txt-mission").find('li').first().remove();
			$("#slider-visu-mission").find('li').first().remove();
			$("#slider-txt-mission").find('li').first().remove();
		}
		// si on est vers le début
		if ($("#slider-visu-mission").find('li.active').index()<$("#slider-visu-mission li").length-5) {
			$("#slider-visu-mission").find('li').last().remove();
			$("#slider-txt-mission").find('li').last().remove();
			$("#slider-visu-mission").find('li').last().remove();
			$("#slider-txt-mission").find('li').last().remove();
		}
	}
	posSlideMission();
}

// actif : gros et en couleur
function makeActive(numToActivate){
	// remettre les autres à 0
	TweenMax.to($("#slider-visu-mission").find("a"), spee, {"width": unitNaked+"px","height": unitNaked+"px", ease:Linear.easeIn});
	TweenMax.to($("#slider-visu-mission").find('li'), spee, {"width": unitNaked+"px", ease:Linear.easeIn});
	$("#slider-visu-mission").find('li').removeClass("active");
	// passer en activ
	TweenMax.to($("#slider-visu-mission").find('li').eq(numToActivate).find("a"), spee, {"width": bigUnit+"px","height": bigUnit+"px", ease:Linear.easeIn});
	TweenMax.to($("#slider-visu-mission").find('li').eq(numToActivate), spee, {"width": bigUnit+"px", ease:Linear.easeIn, onComplete:purgeMission});
	$("#slider-visu-mission").find('li').eq(numToActivate).addClass("active");
}

// slide
function slideMission(indexMiss) {
	TweenMax.to($("#slider-visu-mission"), spee, {marginLeft: -indexMiss*unit-(total*unit+bigUnitDelta)/2-1+"px", ease:Linear.easeIn});
	TweenMax.to($("#slider-txt-mission"), spee, {marginLeft: -(indexMiss+2)*$('#wrapper-slider-visu-mission').width()-1+"px", ease:Linear.easeIn});
	makeActive(indexMiss+2);
}

// on rajoute le premier élément à la fin
function addEntityMission(){
	$("#slider-txt-mission li").eq($("#slider-txt-mission").find('li').length-total).clone().appendTo("#slider-txt-mission");
	$("#slider-visu-mission li").eq($("#slider-visu-mission").find('li').length-total).clone().appendTo("#slider-visu-mission");
	setSizeMission();
	// mappage du clic du nouveau
	$('#slider-visu-mission li').eq($("#slider-visu-mission").find('li').length-1).find('a').unbind('click').on('click', clickOnMission);
}

// on rajoute le dernier élément au début
function addEntityMissionAtBeginning(){
	$("#slider-txt-mission li").eq($("#slider-txt-mission").find('li').first().index()+4).clone().prependTo("#slider-txt-mission");
	$("#slider-visu-mission li").eq($("#slider-visu-mission").find('li').first().index()+4).clone().prependTo("#slider-visu-mission");
	posSlideMission();
	// mappage du clic du nouveau
	$('#slider-visu-mission').first().find('a').unbind('click').on('click', clickOnMission);
}

// on rajoute le premier élément à la fin, on agrandit la liste en fonction
function clickOnMission(e){
	e.preventDefault();	
	// si c'est l'un des deux derniers
	if ($(this).parent().index() >= $("#slider-visu-mission li").length-2) {
		addEntityMission();
		addEntityMission();
	}
	// si c'est l'un des deux premiers
	if ($(this).parent().index() <= 1) {
		addEntityMissionAtBeginning();
		addEntityMissionAtBeginning();
	} 
	slideMission($(this).parent().index()-2);
}

// suivant/précédent
function nextMission(e){
	e.preventDefault();	
	addEntityMission();
	// mouvement
	slideMission($("#slider-visu-mission").find('li.active').index()-1);
}

// initailisation
function sliderMission(){
	var slider = $('#slider-visu-mission');
	// au départ, on en pré-ajoute un
	addEntityMission();
	posSlideMission();
	makeActive(numActive-1);
	// au clic sur suivant
	$('#next-slider-mission').on('click', nextMission);
	if(isMobile.any){
		slider.on('swipeleft', nextMission);
	}
	// mappage des clics
	slider.find('a').on('click', clickOnMission);
}


function goToContact(){
	if(!htmlTag.hasClass('lt-ie9')){ 
		htmlBody.animate({scrollTop: $('#contact').offset().top - 100}, 800, 'easeInOutCubic');
		setTimeout(openForm, 500); 
	}else{
		htmlBody.animate({scrollTop: $('#contact').offset().top}, 800, 'easeInOutCubic');
	}
}

function setCarouselDots(carousel, slides, slideWidth, updateWidth, arrows){
	
	function letSlide(next){
		
		function goToSlide(numSlide){
			var y = 0, x = 0;

			for(y; y<numSlide; y++){
				slides.eq(y).stop().animate({'left': -(numSlide-y)*slideWidth}, 500, 'easeOutExpo');
			}
			slides.removeClass('on').eq(numSlide).addClass('on').stop().animate({'left': 0}, 500, 'easeOutExpo');
			for(numSlide; numSlide<nbSlides; numSlide++){
				slides.eq(numSlide).stop().animate({'left': x*slideWidth}, 500, 'easeOutExpo');
				x++;
			}

			carousel.parents('section').find('.dots').find('li').eq(carousel.find('.on').index()).find('button').addClass('actif').parents('li').siblings().find('button').removeClass('actif');
				
			if(strong.length){ 
				strong.removeClass('on').eq(carousel.find('.on').index()).addClass('on'); 
			}
		}

		var activeSlide = carousel.find('.on');

		if(next === true){
			if(activeSlide.next().length) next = activeSlide.next().index();
		}else if(next === false){
			if(activeSlide.prev().length) next = activeSlide.prev().index();
		}

		if(arrows){
			btnNext.removeClass('none');
			btnPrev.removeClass('none');
			if(next === 0) btnPrev.addClass('none');
			if(next+1 === nbSlides) btnNext.addClass('none');
		}

		goToSlide(next);

	}

	var nbSlides = slides.length, i = 0, p = 0, posSlide = 0, strong = carousel.parents('section').find('.keyword').find('strong'), btnPrev, btnNext;

	if(nbSlides > 1){
		if(!updateWidth){
			if(arrows){
				carousel.prepend('<button id="prev" class="navSlider icon-left none"></button>').append('<button id="next" class="navSlider icon-right"></button>');

				btnPrev = carousel.find('#prev');
				btnNext = carousel.find('#next');

				btnNext.on('click', function(){ letSlide(true); });
				btnPrev.on('click', function(){ letSlide(false); });

				if(isMobile.any){
					carousel.on('swipeleft', function(){ letSlide(true); });
					carousel.on('swiperight', function(){ letSlide(false); });
				}
			}
			
			carousel.parents('.wrapper-ecran').length ? carousel.parents('.wrapper-ecran').after('<ul class="dots"></ul>') : carousel.append('<ul class="dots"></ul>');

			for(i; i<nbSlides; i++){
				carousel.parents('section').find('.dots').append('<li><button>&bull;</button></li>');
			}

			carousel.parents('section').find('.dots').find('button').on('click', function(){ letSlide($(this).parents('li').index()); });
		}
		
		slides.css({'position': 'absolute', 'top': 0}).removeClass('on').eq(0).addClass('on');

		for(p; p<nbSlides; p++){
			slides.eq(p).css('left', posSlide);
			posSlide += slideWidth;
		}

		carousel.parents('section').find('.dots').find('button').removeClass('actif').parents('li').siblings().eq(0).find('button').addClass('actif');

		if(strong.length){  strong.eq(0).addClass('on'); }
	}
}


// Animations sliders
var slideAnim1Active = 1,
	slideAnim2Active = 1,
	slideAnim3Active = 1,
	sliderAnim1Init = false;

function appartitionAnimsSliders(){
	if($("#slider-anim-visez-juste").isOnScreen() && !sliderAnim1Init){
		sliderAnim1Init = true;
		animInitSliderAnim1();
	}
}
// Animation du slider Visez au plus juste
function animInitSliderAnim1(){
	if ($(".slider-anim").length){
		$(".slider-anim").parents('section').find('.keyword').find('strong').eq(0).addClass('on');
	}
}
function sliderAnim1(){
	$("#next-slider-anim-visez-juste").on('click', function(){
		if(!TweenMax.isTweening($(".perso-gauche"))&&!TweenMax.isTweening($(".bulle-centre"))&&!TweenMax.isTweening($(".bulle-gauche1"))&&!TweenMax.isTweening($(".bulle-gauche2"))&&!TweenMax.isTweening($(".file-centre"))&&!TweenMax.isTweening($(".checkbox-centre"))&&!TweenMax.isTweening($(".fleche-centre"))&&!TweenMax.isTweening($(".perso-droite"))){
			if(slideAnim1Active==1){
				slideAnim1Active=2;
				TweenMax.set($("#prev-slider-anim-visez-juste"), {display: "block"});
				$(this).parents('section').find('.keyword').find('strong').removeClass('on');
				$(this).parents('section').find('.keyword').find('strong').eq(1).addClass('on');

				// fin etape 1
				TweenMax.staggerTo(".bulle-centre", 0.4, {y: "-50px", opacity: "0", ease:Cubic.easeOut}, 0.1);
				TweenMax.to($(".bulle-gauche1"), 0.1, {y: "-50px", opacity: "0", ease:Cubic.easeOut});
				TweenMax.set($(".container-fleche-centre .fleche-centre"), {right: "initial", left: "0px"});
				TweenMax.to($(".container-fleche-centre .fleche-centre"), 0.5, {width: "0%", ease:Cubic.easeOut});
				TweenMax.set($(".container-fleche-centre .fleche-centre .fleche-gauche"), {display: "none", delay: 0.5});

				// debut etape 2
				TweenMax.set($(".container-fleche-centre .fleche-centre .fleche-droite"), {display: "block", delay: 0.5});
				TweenMax.to($(".container-fleche-centre .fleche-centre"), 0.5, {width: "100%", ease:Cubic.easeOut, delay: 0.5});
				TweenMax.staggerTo(".file-centre", 0.8, {y: "0px", opacity: "1", ease:Cubic.easeOut, delay: 0.7}, 0.2);
			}else if (slideAnim1Active==2){
				slideAnim1Active=3;
				TweenMax.set($("#next-slider-anim-visez-juste"), {display: "none"});
				$(this).parents('section').find('.keyword').find('strong').removeClass('on');
				$(this).parents('section').find('.keyword').find('strong').eq(2).addClass('on');

				// fin etape 2
				TweenMax.staggerTo(".file-centre", 0.4, {y: "-50px", opacity: "0", ease:Cubic.easeOut}, 0.1);
				TweenMax.set($(".container-fleche-centre .fleche-centre"), {left: "initial", right: "0px"});
				TweenMax.to($(".container-fleche-centre .fleche-centre"), 0.5, {width: "0%", ease:Cubic.easeOut});
				TweenMax.set($(".container-fleche-centre .fleche-centre .fleche-droite"), {display: "none", delay: 0.5});

				// etape 3
				TweenMax.set($(".container-fleche-centre .fleche-centre .fleche-gauche"), {display: "block", delay: 0.5});
				TweenMax.to($(".container-fleche-centre .fleche-centre"), 0.5, {width: "100%", ease:Cubic.easeOut, delay: 0.5});
				TweenMax.staggerTo(".checkbox-centre", 0.8, {y: "0px", opacity: "1", ease:Cubic.easeOut, delay: 0.5}, 0.2);
				TweenMax.to($(".bulle-gauche2"), 0.4, {y: "0px", opacity: "1", ease:Cubic.easeOut, delay: 2});
				TweenMax.to($(".checkbox-checked-centre"), 0.4, {opacity: "1", ease:Cubic.easeOut, delay: 2.4});
				
			}
		}
		return false;
	});

	$("#prev-slider-anim-visez-juste").on('click', function(){
		if(!TweenMax.isTweening($(".perso-gauche"))&&!TweenMax.isTweening($(".bulle-centre"))&&!TweenMax.isTweening($(".bulle-gauche1"))&&!TweenMax.isTweening($(".bulle-gauche2"))&&!TweenMax.isTweening($(".file-centre"))&&!TweenMax.isTweening($(".checkbox-centre"))&&!TweenMax.isTweening($(".fleche-centre"))&&!TweenMax.isTweening($(".perso-droite"))){
			if(slideAnim1Active==2){
				slideAnim1Active=1;
				TweenMax.set($("#prev-slider-anim-visez-juste"), {display: "none"});
				$(this).parents('section').find('.keyword').find('strong').removeClass('on');
				$(this).parents('section').find('.keyword').find('strong').eq(0).addClass('on');

				// retour etape 2
				TweenMax.staggerTo(".file-centre", 0.4, {y: "-50px", opacity: "0", ease:Cubic.easeOut}, 0.1);
				TweenMax.set($(".container-fleche-centre .fleche-centre"), {left: "initial", right: "0px"});
				TweenMax.to($(".container-fleche-centre .fleche-centre"), 0.5, {width: "0%", ease:Cubic.easeOut});
				TweenMax.set($(".container-fleche-centre .fleche-centre .fleche-droite"), {display: "none", delay: 0.5});

				// etape 1
				TweenMax.set($(".container-fleche-centre .fleche-centre .fleche-gauche"), {display: "block", delay: 0.5});
				TweenMax.to($(".container-fleche-centre .fleche-centre"), 0.5, {width: "100%", delay: 0.5, ease:Quint.easeOut});
				TweenMax.staggerTo(".bulle-centre", 0.8, {y: "0px", opacity: "1", ease:Quint.easeOut, delay: 1}, 0.2);
				TweenMax.to($(".bulle-gauche1"), 0.4, {y: "0px", opacity: "1", delay: 2, ease:Quint.easeOut});
			}else if (slideAnim1Active==3){
				slideAnim1Active=2;
				TweenMax.set($("#next-slider-anim-visez-juste"), {display: "block"});
				$(this).parents('section').find('.keyword').find('strong').removeClass('on');
				$(this).parents('section').find('.keyword').find('strong').eq(1).addClass('on');

				// retour etape 3
				TweenMax.staggerTo(".checkbox-centre", 0.8, {y: "-50px", opacity: "0", ease:Cubic.easeOut}, 0.2);
				TweenMax.to($(".bulle-gauche2"), 0.4, {y: "-50px", opacity: "0", ease:Cubic.easeOut});
				TweenMax.to($(".checkbox-checked-centre"), 0.4, {opacity: "0", ease:Cubic.easeOut});
				TweenMax.set($(".container-fleche-centre .fleche-centre"), {left: "0px", right: "initial"});
				TweenMax.to($(".container-fleche-centre .fleche-centre"), 0.5, {width: "0%", ease:Cubic.easeOut});
				TweenMax.set($(".container-fleche-centre .fleche-centre .fleche-gauche"), {display: "none", delay: 0.5});

				// debut etape 2
				TweenMax.set($(".container-fleche-centre .fleche-centre .fleche-droite"), {display: "block", delay: 0.5});
				TweenMax.to($(".container-fleche-centre .fleche-centre"), 0.5, {width: "100%", ease:Cubic.easeOut, delay: 0.5});
				TweenMax.staggerTo(".file-centre", 0.8, {y: "0px", opacity: "1", ease:Cubic.easeOut, delay: 0.7}, 0.2);
			}
		}
		return false;
	});
}

// ouverture champ de recherche //
function openSearch(e){
	if($(window).width() > 767){
		e.preventDefault();

		var form = $('#searchform'),
			input = $('#searchInput'),
			query = input.val(),
			queryLength = query.length;

		input.on('blur', function(){
			if(form.hasClass('on'))
				form.removeClass('on');
		});

		queryLength === 0 /*|| !form.hasClass('on')*/ ? form.addClass('on').find(input).focus() : form.submit();
	}else{
		return true;
	}
}


/****** SUCCESS ******/

function responsiveMenuSuccess(){
	if(!burger.hasClass('actif')){
		burger.css({opacity: 0}).delay(10).animate({opacity: 1}, 100);
	}

	burger.toggleClass('actif');
	header.toggleClass('menuVisible');
	$('#fdMenu').fadeToggle(300);
	$('#container').toggleClass('openMenu');

	if($(window).width() < 911)
		$('.connectMenu').toggleClass('on');
}

function animateArrowsTrip(){
	var btn1 = $('#nextTrip'), btn2 = $('#prevTrip');

	if($('.trip-step.actif').find('.bgBlue').length){
		var section = $('.trip-step.actif').find('.bgBlue');

		function changeColor(btn, blueTop, blueBottom){
			var btnTop = Math.floor(btn.offset().top - $(document).scrollTop()),
				btnBottom = btnTop + btn.height();

			if((btnTop + btn.height()/2) >= blueTop){
				if(!btn.hasClass('white'))
					btn.addClass('white');
			}
			if(btnBottom >= blueBottom || btnBottom < blueTop){
				if(btn.hasClass('white'))
					btn.removeClass('white');
			}
		}

		if(btn1.length){
			var blueTop = Math.floor(section.find('.before').offset().top - $(document).scrollTop()),
				blueBottom = blueTop + section.innerHeight() + filterInt( section.css('margin-top').replace('px','') );

			if($('.trip-step.actif').hasClass('even')){
				blueTop = Math.floor(section.offset().top - $(document).scrollTop());
				blueBottom = blueTop + section.innerHeight() + filterInt( section.css('margin-bottom').replace('px','') );
			}

			changeColor(btn1, blueTop, blueBottom);
		}

		if(btn2.length){
			var blueTop = Math.floor(section.offset().top - $(document).scrollTop()),
				blueBottom = blueTop + section.innerHeight() + filterInt( section.css('margin-bottom').replace('px','') );

			if($('.trip-step.actif').hasClass('even')){
				blueTop = Math.floor(section.find('.before').offset().top - $(document).scrollTop());
				blueBottom = blueTop + section.innerHeight() + filterInt( section.css('margin-top').replace('px','') );
			}

			changeColor(btn2, blueTop, blueBottom);
		}
	}else{
		btn1.removeClass('white');
		btn2.removeClass('white');
	}

	requestAnimFrame(animateArrowsTrip);
}

function wisemblyTrip(updateHeight){

	function goToStep(nextStep, dir, round){
		
		function animateShapes(){
			
			function setCoordinates(shape, axe, rand, randCoord, axeX){
				shapeDefault = filterInt(shape.css(axe).replace('px',''));
				
				if( shape.isOnScreen() ){
					newCoord = shapeDefault;
					if(axeX){
						if(axe == 'left'){
							newCoord += (dir == 'next') ? randCoord : - randCoord;
						}else{
							newCoord -= (dir == 'next') ? randCoord : - randCoord;
						}
					}else{
						newCoord += (rand > .5) ? randCoord : - randCoord;
					}
					newCoord += 'px';
				}else if(!axeX){
					newCoord = '';
				}
				shape.css(axe, newCoord);

			}

			var i = 0, randAngle, randNeg, randColors = shuffle([0, 1, 2, 3, 4]);

			for(i; i<nbShapes; i++){
				randAngle = Math.random() * (30 - 5) + 5;
				randNeg = Math.random();
				randNeg = randNeg > .5 ? '-' : '+';

				shapes[i].css({
					'border-bottom-color': colors[ randColors[i] ], 
					'opacity': Math.random() + .3,
					'transform': 'rotate('+randNeg+randAngle+'deg)',
					'-ms-transform': 'rotate('+randNeg+randAngle+'deg)',
					'-webkit-transform': 'rotate('+randNeg+randAngle+'deg)'
				});

				setCoordinates(shapes[i], shapes[i].data('y'), Math.random(), Math.floor(Math.random() * 20));
				setCoordinates(shapes[i], shapes[i].data('x'), Math.random(), Math.floor((Math.random() * (40 - 10) + 10 ) ), true);
			}
		}

		function makeItTurn(){
			var j = 0, actualPos, newLeft;

			for(j; j<nbSteps; j++){
				actualPos = steps.eq(j).data('left');
				newLeft = dir == 'next' ? actualPos-100 : actualPos+100;

				steps.eq(j).css('left', newLeft+'%').data('left', newLeft);
				if(steps.eq(j).hasClass('actif')){
					steps.eq(j).removeClass('actif');
				}
			}

			animateShapes();
		}
		
		if(!round || round == 1){
			makeItTurn();
		}else{
			var x = 0;
			for(x; x<round; x++){
				makeItTurn();
			}
		}

		$(nextStep).addClass('actif');
		container.css('height', $(nextStep).height());

		var posActif = $('.trip-step.actif').index(), 
			idActif = steps.eq(posActif).attr('id'),
			idPrev = steps.eq(posActif-1).attr('id'),
			idNext = steps.eq(posActif+1).attr('id');

		pagination.find('li').eq(posActif).find('a').addClass('actif').parents('li').siblings().find('a').removeClass('actif');

		if(posActif > 0){
			if(nav.find('#prevTrip').length){
				nav.find('#prevTrip').attr('href', '#'+idPrev);
			}else{
				nav.find('li').eq(0).append("<a href='#"+idPrev+"' id='prevTrip'><span>Previous step</span></a>")
			}

		}else{
			nav.find('li').eq(0).html('');
		}

		if(posActif < nbSteps - 1){
			if(nav.find('#nextTrip').length){
				nav.find('#nextTrip').attr('href', '#'+idNext);
			}else{
				nav.find('li').eq(1).append("<a href='#"+idNext+"' id='nextTrip'><span>Next step</span></a>")
			}
		}else{
			nav.find('li').eq(1).html('');
		}

	}

	var container = $('#trip'), steps = $('.trip-step'),
		shapes = [$('#t1'), $('#t2'), $('#t3'), $('#t4')],
		nbShapes = shapes.length,
		colors = ['#46b489', '#e25c5b', '#06698d', '#f7886c', '#f1bc33'],
		nbColors = colors.length;

	if(!updateHeight){
		var nbSteps = steps.length, i = 0, left = 0,
			nav = $('#navTrip'), pagination = $('#pagiTrip');


		for(i; i<nbSteps; i++){
			steps.eq(i).css('left', left+'%').data('left', left);
			left += 100;
		}

		container.css('height', steps.eq(0).height() + 30);

		function changeStep(){
			if(location.hash){
				var ancre = location.hash.replace('#',''),
			   		target = '#trip' + ancre,

			   		targetPos = $(target).index(),
			   		actifPos = $('.trip-step.actif').index(),
			   		rounds = targetPos - actifPos;

			   	if(rounds > 0){
			   		goToStep(target, 'next', rounds);
			   	}

			   	if(rounds < 0){
			   		goToStep(target, 'prev', Math.abs(rounds));
			   	}
			   		
			}
		}

		changeStep();

		$(window).bind('popstate', function(event) {
			changeStep();
		});

		container.css('opacity', 1);

		nav.on('click', '#nextTrip', function(e){
			e.preventDefault();
			if(Modernizr.history)
				window.history.pushState(null, '', $(this).attr('href').replace('trip',''));
			goToStep($(this).attr('href'), 'next');
		});

		nav.on('click', '#prevTrip', function(e){
			e.preventDefault();
			if(Modernizr.history)
				window.history.pushState(null, '', $(this).attr('href').replace('trip',''));
			goToStep($(this).attr('href'), 'prev');
		});

		pagination.find('a').on('click', function(e){
			e.preventDefault();
			var targetStep = $(this).attr('href'),
				targetPos = $(targetStep).index(),
				actifPos = $('.trip-step.actif').index(),
				rounds = targetPos - actifPos;

			if(Modernizr.history)
				window.history.pushState(null, '', $(this).attr('href').replace('trip',''));

			if(rounds > 0){
				goToStep($(this).attr('href'), 'next', rounds);
			}

			if(rounds < 0){
				goToStep($(this).attr('href'), 'prev', Math.abs(rounds));
			}
		});
	}else{
		container.height($('.trip-step.actif').height());
	}
	
}

// Apparition du slider trip conception //
function setDraggableInputs(container, parts, nbForm, firstClick){
	var dragWidth = container.width()-10,
		pos1 = 5, pos2 = (dragWidth/parts) - 3,
		pos3 = parts > 2 ? (2*(dragWidth/parts)) - 5 : dragWidth - 15,
		pos4 = parts > 3 ? (3*(dragWidth/parts)) - 5 : dragWidth - 15,
		pos5 = dragWidth - 15,
		positions = [pos1, pos2, pos3, pos4, pos5],
		fields = container.siblings('fieldset'),
		id = 'drag'+nbForm,
		firstNb = firstClick.index();

	if(parts > 4){
		positions = [pos1, pos2, pos3, pos4];
		if(parts > 3){
			positions = [pos1, pos2, pos3];
		}
	}

	function updateDrag(nb){
		fields.eq(nb).removeClass('noCheck').find('input').prop('checked', true).change().parents('fieldset').siblings('fieldset').addClass('noCheck').find('input').prop('checked', false).change();
	}

	container.append("<div id='"+id+"'></div>");
	Draggable.create('#'+id, {
		type: 'x', 
		bounds: container,
		cursor: 'pointer',
		throwProps: true,
		snap: positions,
		throwResistance: 2000,
		maxDuration: 3,
		onThrowComplete: function(){
			switch (this.x){
				case positions[0]:
					updateDrag(0);
					break;
				case positions[1]:
					updateDrag(1);
					break;
				case positions[2]:
					updateDrag(2);
					break;
				case positions[3]:
					updateDrag(3);
					break;
				case positions[4]:
					updateDrag(4);
					break;
			}
		}
	});

	TweenLite.set($('#'+id),{x: positions[firstNb] });
	updateDrag(firstNb);

	fields.on('click', function(){
		nb = $(this).index();
		TweenLite.set($('#'+id),{x: positions[nb] });
		updateDrag(nb);
	});

}

function openVideos(videoLink){
	var videoContainer = $('#videoContainer'),
		headVideo = $('#headVideo');

	function appendVideo(){
		videoContainer.html('<ifra'+'me id="videoIframe" width="860" height="480" src="'+ videoLink +'" frameborder="0" allowfullscreen></ifra'+'me>');
	}

	htmlBody.animate({scrollTop: 0}, 300, 'easeInOutCubic');

	if(!headVideo.hasClass('open')){
		headVideo.removeClass('none');
		
		headVideo.append('<button id="closeVideo">&#xe619;</button>');
		heightBgHead(videoContainer.outerHeight(true)+480);
		
		headVideo.animate({'height': videoContainer.outerHeight(true)+480}, 500, function(){
			appendVideo();
			headVideo.addClass('open');
		});
	}else{
		videoContainer.find('#videoIframe').animate({'opacity': 0}, 300, function(){
			appendVideo();
		});
	}
	
}

function closeVideo(){
	var videoContainer = $('#videoContainer'),
		headVideo = $('#headVideo');

	headVideo.removeClass('open').animate({'height': '30px'}, 400, function(){
		headVideo.addClass('none');
	});
	videoContainer.find('#videoIframe').animate({'opacity': 0}, 300, function(){
		videoContainer.find('#videoIframe').remove();
	});
	$(this).animate({'opacity': 0}, 300, function(){
		$(this).remove();
		heightBgHead(0);
	});
}

// Apparition du slider permettant de chosir le nb de participants (success) //
function setDraggableDebitButton(){
	var container = $('#debitContainer'), txt = container.data('txt'), 
		posX,  tooltip = $('#nbParticipants'),
		nbMax = container.data('debitmax'), nbDefault = container.data('debit'), 
		nb, dragWidth, draggable, drag = $('#drag'), dragContainer = $('#dragContainer'),
		a = $('#debitA'), aCompare = a.data('compare'), aDivise = a.data('divise'),
		b = $('#debitB'), bCompare = b.data('compare'), bDivise = b.data('divise'),
		c = $('#debitC'), cCompare = c.data('compare'), cDivise = c.data('divise'),
		d = $('#debitD'), dCompare = d.data('compare'), dDivise = d.data('divise'),
		steps = $('#debitSteps').find('div'), stepsNb = [], stepsLength = steps.length, i = 0;

	function calc(compare, divise, nb, txt){
		return nb > compare ? txt : nb/divise + ' Mo';
	}

	function setActiveStep(i, nb){
		
		function lightIt(step){
			step.addClass('actif').parents('li').siblings().find('div').removeClass();
		}

		if(i == 0){
			if(nb <= stepsNb[i]){
				lightIt(steps.eq(i));
			}
		}else{
			if(nb >= stepsNb[i]){
				lightIt(steps.eq(i));
			}
		}
	}

	function updateData(nb){
		a.html(calc(aCompare, aDivise, nb, txt));
		b.html(calc(bCompare, bDivise, nb, txt));
		c.html(calc(cCompare, cDivise, nb, txt));
		d.html(calc(dCompare, dDivise, nb, txt));

		i = 0;
		for(i; i<stepsLength; i++){
			setActiveStep(i, nb);
		}

		tooltip.html(nb);
	}

	dragWidth = dragContainer.width() - drag.width();

	for(i; i<stepsLength; i++){
		stepsNb[i] = steps.eq(i).data('nb');
		setActiveStep(i, nbDefault);
	}

	draggable = Draggable.create('#drag', {
		type: 'x', 
		bounds: dragContainer,
		cursor: 'pointer',
		zIndexBoost:false,
		onDrag: function(){
			TweenLite.set(tooltip,{x:this.x});
			nb = Math.ceil((nbMax/dragWidth)*this.x);
			updateData(nb);
		}
	});

	posX = (nbDefault*dragWidth)/nbMax;
	TweenLite.set(drag,{x:posX});
	TweenLite.set(tooltip,{x:posX});
	draggable[0].update();

	dragContainer.on('click', function(e){
		var posX = Math.ceil(e.pageX - $(this).offset().left - drag.width()/2), realNb;

		if(posX < 0) posX = 0;
		if(posX > dragWidth) posX = dragWidth;

		realNb = Math.ceil((nbMax/dragWidth)*posX);
		
		TweenLite.set(drag,{x: posX });
		TweenLite.set(tooltip,{x: posX});
		updateData( realNb );
	});
}


function setActiveSuccessMenu(){
	var menu = $('#menu'), current = menu.find('.current-menu-item');

	if( current.length ){

		/* Condition pour filtres Incriptions */
		if(current.length > 1){
			current = menu.find('.current-menu-item').eq(1);
			menu.find('.current-menu-item').eq(0).removeClass();
		}

		current.siblings().find('a').addClass('notActive');
		current.parents('.hasSubMenu').siblings().addClass('notActive');
	}
}

function openZendeskSearch(evt, keyEvent){
	if(!keyEvent){
		evt.preventDefault();
	}
	if($('#searchZenInput').val() != ''){
		if( (keyEvent && evt.keyCode == 13 || !keyEvent) ){
			var href = $('#searchZen').attr('href') + '?query=' + $('#searchZenInput').val();
			window.open(href, '_blank');
		}
	}else{
		$('#searchZenInput').focus();
	}
}

function stickyFooter(){
	var docHeight = htmlTag.height(),
	    windowHeight = $(window).height(),
	    footer = $('footer');

	if(footer.hasClass('bottom')){
		docHeight += footer.height();
		if (docHeight >= windowHeight) {
			footer.removeClass('bottom');
		}
	}
	if (docHeight < windowHeight) { 
	   footer.addClass('bottom');
	}
}


/**** INIT ****/
$(function(){

	// No-mobile //
	if(!isMobile.any){
		htmlTag.addClass("no-mobile");
	}

	if(!body.hasClass('landing')){
		if(!body.hasClass('blog') && !body.hasClass('success')){
			// Make links not active in grey //
			setActiveMenu();

			// Sous menu //
			setSubMenu();

			// WIZ //
			joinAnEvent.startListening();
		}

		// Lang selector //
		if(htmlTag.attr('lang') !== 'fr-FR'){
			langSelector();
		}
	}

	if(body.hasClass('success')){
		setActiveSuccessMenu();
		if(isMobile.any)
			stickyFooter();
	}

	if(!body.hasClass('blog')){
		// Photo header //
		heightBgHead();

		// Scroll init //
		scrollPage();
	}

	if(body.hasClass('page-template-trip')){
		wisemblyTrip();
		if($(window).width() > 1300)
			animateArrowsTrip($('.trip-step.actif'));
	}
	$('#dragQ1').parents('form').one('click', 'fieldset', function(){
		setDraggableInputs($('#dragQ1'), 3, 1, $(this));
	});
	/*$('#dragQ2').parents('form').one('click', 'fieldset', function(){
		setDraggableInputs($('#dragQ2'), 4, 2, $(this));
	});*/
	$('#dragQ3').parents('form').one('click', 'fieldset', function(){
		setDraggableInputs($('#dragQ3'), 2, 3, $(this));
	});


	$('#closePopBlog').on('click', function(){
		$('#popupBlog').animate({'height': 0}, function(){
			$(this).css('display', 'none');
			$.cookie('blog', true, { expires: 7, path: '/' });
		});
	});	

	// RDV / Clients filtres //
	if( $('.filtres').find('.actif').length ){
		goToContent();
	}

	// Size map //
	if( $('#map').length ){
		setMapSize();
	}

	if($('#slider-visu-mission').length && !htmlTag.hasClass('lt-ie9')){
		sliderMission();
	}

	if(body.hasClass("page-template-emploi")){
		initAnnonces();
	}

	// Slider footer //
	if($(window).width() > 450 && !htmlTag.hasClass('lt-ie9') && $('.buttonsTeam').length){
		setDraggableButton();
	}

	// Textarea footer autogrow //
	if($('#message').length){
		$('#message').autoGrowTextArea();
	}

	// Slider debit success //
	if($('#debitContainer').length){
		$('#debitContainer').append("<div id='dragContainer'><div id='drag'></div></div>");
		setDraggableDebitButton();
	}

	// Placeholder IE8 //
	if(htmlTag.hasClass('lt-ie9') && $('#event').length){
		var input = $('#event'), placeholder = input.attr('placeholder');
		input.attr('value', placeholder).on('click', function(){
			if($(this).attr('value') === placeholder) $(this).attr('value', '');
		});
	}

	// Responsive menu //
	if(!body.hasClass('success')){
		burger.on('click', responsiveMenu);
		$('#triangleMenu').on('click', function(){
			burger.removeClass('actif');
			header.removeClass('menuVisible');
			$('#container').css({height: 'auto', overflow: 'visible'});
		}); 
	}else{
		burger.on('click', responsiveMenuSuccess);
	}

	// Changement de slider au clic btn footer (entreprise, agence, etc...) //
	$('.buttonsTeam').find('button').on('click', function(){ setSliderTeamProfil($(this)); openForm(); });

	// Btn demande de contact footer //
	btnContact.on('click', openForm);

	if($('.formContact').hasClass('open')){ openForm(); }	

	// Landing livre blanc formulaire //
	if($('.form').hasClass('open')){
		htmlBody.animate({scrollTop: $('.form').offset().top}, 800, 'easeInOutCubic');
	}	

	$('#contact-topbar').on('click', function(e){
		if(header.hasClass('menuVisible')){
			responsiveMenu();
		}
		e.preventDefault();
		goToContact();
	});

	$('.home .blocH1').find('.btnFull').on('click', function(e){
		e.preventDefault();
		htmlBody.animate({scrollTop: $('#contact').offset().top - 100}, 800, 'easeInOutCubic');
		goToContact();	
	});

	// Changement label entreprise selon profil //
	$('#profil').change(function(){
		$('#labelEnt').html($(this).val() + ' *');
	});

	// Petites fleches //
	$('.scrollNext').on('click', goToNextSection);

	// Btn video //
	$('#btn-video').on('click', videoCover);

	// Scroll Top //
	if(scrollTop.length){
		scrollTop.on('click', function(e){
			e.preventDefault();
			htmlBody.animate({scrollTop: $('#top').offset().top}, 800, 'easeInOutCubic');
		});
	}

	// Slider anim Visez au plus juste //
	if( $('#slider-anim-visez-juste').length ){
		sliderAnim1();
	}

	// Searchform - blog //
	$('#search').on('click', openSearch);

	// Search - Success //
	$('#searchZenInput').on('keypress', function(e){
		openZendeskSearch(e, 'keypress');
	});
	$('#searchZen').on('click', function(e){
		openZendeskSearch(e);
	});

	// Go To Comments //
	$('#goToCom').on('click', function(e){
		e.preventDefault();
		htmlBody.animate({scrollTop: $('#comments').offset().top - 100}, 800, 'easeInOutCubic');
	});

	// Open and close videos in success //
	$('.openVideo').on('click', function(e){
		if(!htmlTag.hasClass('lt-ie9')){
			e.preventDefault();
			openVideos($(this).attr('href'));
		}
	});

	$('#headVideo').on('click', '#closeVideo', closeVideo);

	if($.urlParam('video')){
		if(!htmlTag.hasClass('lt-ie9')){
			openVideos($.urlParam('video'));
		}else{
			window.open($.urlParam('video'), '_blank');
		}
	}
	if($.urlParam('slideshare')){
		if(!htmlTag.hasClass('lt-ie9')){
			openVideos($.urlParam('slideshare'));
		}else{
			window.open($.urlParam('slideshare'), '_blank');
		}
	}

	$(window).load(function(){
		if(!body.hasClass('landing')){
			if(!body.hasClass('blog') && !body.hasClass('success')){
				// Sous menu //
				centerSubMenu();
				// Anim triangles header + footer //
				scrollMagic();
			}
		}

		if(body.hasClass("home")){
			// Logos presse //
			randomLogosPress();
		}

		// Tooltip ref home //
		if($('#sliderRef').length && !htmlTag.hasClass('lt-ie9')){
			setToolTip($('#sliderRef'));
		}

		// Slider footer //
		if($('#sliderTeam').length){
			setSliderTeam($('.slidesTeam').eq(0));
		}

		// Tooltip etudes de cas //
		if($('#etudes').length && !htmlTag.hasClass('lt-ie9')){
			setToolTip($('#etudes'));
		}

		// Slider //
		if($('.carousel').length){
			setSliderHeight($('.carousel'));
			$('.carousel').contentcarousel({ sliderEasing: 'easeOutExpo' });
		}

		// Gallery //
		if($('.gallery').length){
			setSliderHeight($('.gallery'));
			$('.gallery').contentcarousel({ sliderEasing: 'easeOutExpo' });
		}

		// Carousel with dots //
		if($('.carouselDots').length){
			setSliderHeight($('.carouselDots'));
			var c = 0, carousels = $('.carouselDots'), nbCarousels = carousels.length;
			if(!body.hasClass('blog')){
				for(c; c<nbCarousels; c++){
					setCarouselDots(carousels.eq(c), carousels.eq(c).find('li'), carousels.eq(c).find('li').eq(0).width(), false, true);
				}
			}else{
				for(c; c<nbCarousels; c++){
					setCarouselDots(carousels.eq(c), carousels.eq(c).find('li'), carousels.eq(c).find('li').eq(0).width(), false, false);
				}
			}
		}

		if($('#slider-diapos').length){
			positionDiapos();
		}

		if(body.hasClass('blog')){
			if($('.blogWisembly').length){
				var blogWisembly = $('.blogWisembly');
				blogWisemblyTop = $(window).width() < 1161 ? blogWisembly.offset().top - 20 : blogWisembly.offset().top - 150;
			}
			
			// Scroll init //
			scrollPage();

			// Espace insécables avant ponctuation //
			var wrapperBlog = $('#container').find('.wrapper');
			espaceFine(wrapperBlog.find('h2').find('a'));
			espaceFine(wrapperBlog.find('p'));
			espaceFine(wrapperBlog.find('h1'));
		}
		
	});

    $(window).resize(function(){

    	if(!body.hasClass('landing') && !body.hasClass('blog') && !body.hasClass('success')){
    		minHeight = $('.menu').innerHeight() - 10;
    		fixedHeader();
    		setSubMenu();
    		centerSubMenu();
    		setPosBtnMenu();
    	}

    	if(!body.hasClass('blog')){
    		heightBgHead();
    	}else{
    		if($('.blogWisembly').length){
    			blogWisemblyTop = $(window).width() < 1161 ? $('.blogWisembly').offset().top - 20 : $('.blogWisembly').offset().top - 150;
    		}
    	}
    	
	    if(header.hasClass('menuVisible') && $(window).width() > 1040 && !body.hasClass('success')){
	    	responsiveMenu();
	    }

	    if(body.hasClass('success') && isMobile.any){
	    	stickyFooter();
	    }

	    if(body.hasClass('page-template-trip')){
	    	wisemblyTrip(true);
	    }

	    if(body.hasClass('page-template-installation')){
	    	setDraggableDebitButton();
	    }

	    // Size map //
	    if( $('#map').length ){
	    	setMapSize();
	    }

		if($('#next-slider-mission').length){
			posSlideMission();
		}

		// Slider //
		if($('.carousel').length){
			setSliderHeight($('.carousel'));
		}

		// Gallery //
		if($('.gallery').length){
			setSliderHeight($('.gallery'));
		}

		// Carousel with dots //
		if($('.carouselDots').length){
			setSliderHeight($('.carouselDots'));
			var c = 0, carousels = $('.carouselDots'), nbCarousels = carousels.length;
			if(!body.hasClass('blog')){
				for(c; c<nbCarousels; c++){
					setCarouselDots(carousels.eq(c), carousels.eq(c).find('ul').eq(0).find('li'), carousels.eq(c).find('li').eq(0).width(), true, true);
				}
			}else{
				for(c; c<nbCarousels; c++){
					setCarouselDots(carousels.eq(c), carousels.eq(c).find('ul').eq(0).find('li'), carousels.eq(c).find('li').eq(0).width(), true, false);
				}
			}
		}
	});

});