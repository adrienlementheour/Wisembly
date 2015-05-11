/**** VARIABLES ****/
var myScroll,
	header = $('header'),
	htmlTag = $('html'),
	htmlBody = $('html, body'),
	body = $("body"),
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
	sliderSmall = false;


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

function shuffle(array) {
  var random = array.map(Math.random);
  array.sort(function(a, b) {
    return random[a] - random[b];
  });
}

function isValidEmail(email) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(email);
}


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

// Appartition footer social //
function apparitionFooter(){
	if(!isMobile.any){
		$('.navFooter').isOnScreen() ? TweenMax.set($(".rsFooter"), {visibility:"visible"}) : TweenMax.set($(".rsFooter"), {visibility:"hidden"});
	}
}

// Animations au scroll //
function scrollPage(){
	myScroll = $(document).scrollTop();

	if(!body.hasClass('landing')){
		fixedHeader();
		apparitionFooter();
	}

	if(!htmlTag.hasClass("lt-ie9") && !isMobile.any && myScroll < $(".head").height() && $(window).width() > 767){
		TweenMax.set(bgHead, {y:-(myScroll/1.5)+"px"});
		TweenMax.set($('.head').find('.content'), {y:+(myScroll/2.5)+"px"});
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

				if(widthSubMenu + newPosSubMenu >= $(window).width()){
					subMenus.eq(i).css({'padding-left': 0, 'text-align': 'center'});
				}else{
					subMenus.eq(i).css('padding-left', newPosSubMenu + 'px');
				}
			}
		}else{
			subMenus.css('padding-left', 0);
		}

	}
}

// Sélecteur de langue header //
function langSelector(){
	var menuLang = $('.lang'), actifLi = menuLang.find('.actif');
	menuLang.prepend(actifLi).find('.actif').eq(1).remove();
}

// Gérer la position du bouton "je suis intéressé" et du texte "contactez-nous" dans le menu responsive //
function setPosBtnMenu(){
	var btn = $('.bottomHeader').find('.btnFull'), txt = $('.topHeader').find('p');
	if($(window).width() < 1040){
		btn.css('top', minHeight);
		txt.css('top', minHeight + 80);
	}else{
		btn.css('top', 0);
		txt.css('top', 0);
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
		slider.siblings('.slidesTeam').stop().animate({opacity: 0, bottom: '-140px'}, 400, function(){
			slider.addClass('on').stop().animate({opacity: 1, bottom: '-115px'}, 400).siblings('.slidesTeam').removeClass('on');

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
		});
		setSliderTeam(slider);
	}

	// Récupérer la valeur du name et l'appliquer au select "profil" //
	$('#profil').find('option[value='+ that.attr('name') +']').prop('selected', true);

	// Changement du champ entreprise //
	var label = that.html() === 'Autre' ? 'Organisation' : that.html();
	$('#labelEnt').html(label + ' *');
}

// Apparition du slider permettant de chosir son profil //
function setDraggableButton(){
	var buttons = $('.buttonsTeam').find('button');
	btnContact.before("<div id='dragIn'><div id='drag'></div></div>");
	Draggable.create('#drag', {
		type: 'x', 
		bounds: $('#dragIn'),
		cursor: 'pointer',
		throwProps: true,
		snap: [0, 130, 235, 334],
		throwResistance: 5000,
		maxDuration: 3,
		onThrowComplete: function(){
			var button;
			if(this.x === 0){
				button = buttons.eq(0);
			}
			if(this.x === 130){
				button = buttons.eq(1);
			}
			if(this.x === 235){
				button = buttons.eq(2);
			}
			if(this.x === 334){
				button = buttons.eq(3);
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
			$('#contact, #bulle').addClass('visible');
			setTimeout(function(){ htmlBody.animate({scrollTop: $('#contact').offset().top - 250}, 400, 'easeInOutCubic'); }, 300);
			$('#nom').focus();
		});
	}else{
		setTimeout(function(){ htmlBody.animate({scrollTop: $('.formContact').offset().top - 200}, 500, 'easeInOutCubic'); }, 300);
	}
}

// ScrollMagic ( triangle footer + header )
function scrollMagic(){
	if( $(window).width() > 767 ){
		var controller = new ScrollMagic(),
			triangleTopHeader = TweenMax.to($("#triangle-top-header"), 1.2, {css:{y: "0px", rotation: "0deg", force3D:true}}),
			tiangleMenuFooter = TweenMax.to($(".triangle-menu-footer"), 1.2, {css:{rotation: "-3deg", y: "0px", opacity: "1", force3D:true}});

		var whenInContainer4 = new ScrollScene({
			triggerElement: '.menuFooter',
			duration: $('.menuFooter').outerHeight(),
			offset: -300
		}).setTween(tiangleMenuFooter).addTo(controller);
	}
}

// Scroll to section suivante //
function goToNextSection(){
	htmlBody.animate({scrollTop: $(this).parents('.scrollHere').next('.scrollHere').offset().top - 100}, 400);
}

// Réglage de la photo d'entête //
function heightBgHead(){
	if($(window).width() > 767){
		if(!htmlTag.hasClass("lt-ie9") && !isMobile.any){
			TweenMax.set(bgHead, {position:"fixed"});
		}
		var calc = Math.ceil($(".head").height())-1;
		TweenMax.set(bgHead, {height:calc+"px"});
	}else{
		if(htmlTag.hasClass('home')){
			TweenMax.set(bgHead, {height: "340px"});
		}
		TweenMax.set(bgHead, {position:"absolute"});
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
	var logos = $('.logosPresse').find('li'), logosLength = logos.length, 
		i = 0, nbLogos = 4, j = 0, tabRand = [];

	if(logosLength > nbLogos){
		logos.css('display', 'none');

		for(j; j<logosLength; j++){
			tabRand[j] = j;
		}
		shuffle(tabRand);

		for(i; i<nbLogos; i++){
			logos.eq(tabRand[i]).css('display', 'inline-block');
		}
	}
}

// RDV filtres //
function goToContent(){
	setTimeout(function(){
		htmlBody.animate({scrollTop: $('.wrapper').offset().top - 100}, 400);
	}, 400);
}

function setMapSize(){
	$('#map').height($(window).height() - header.height());
}

function setToolTip(context){
	var links = context.find('a'), linksLength = links.length, i = 0, titles = [], linkOffset;

	if(links.attr('title') !== ''){

		for(i; i<linksLength; i++){
			titles[i] = links.eq(i).attr('title');
			links.eq(i).removeAttr('title').append("<span class='tooltip' style='display:none'>"  + titles[i] + "</span>");
		}

		links.on('mouseenter', function(){
			$(this).find('.tooltip').delay(300).css('display', 'block');
		}).on('mouseleave', function(){
			setTimeout(function(){
				$(this).find('.tooltip').css('display', 'none');
			}, 300);
		});

		links.on('mousemove', function(e){
			linkOffset = $(this).offset();
			$(this).find('.tooltip').css({'top': e.pageY - linkOffset.top + 20, 'left': e.pageX - linkOffset.left - 20});
		});

	}
}

function setSliderHeight(context){
	var li = context.find('li'), liLength = li.length, i = 0, nbDiv = [], nbDivBigger = 0, liBigger;

	for(i; i < liLength; i++){
		nbDiv[i] = li.eq(i).find('div').length;
		if(nbDiv[i] > nbDivBigger){
			nbDivBigger = nbDiv[i];
			liBigger = i;
		}
	}

	context.find('ul').css('height', li.eq(liBigger).outerHeight());
}

function setSliderHeightLi(context){
	var li = context.find('li'), liLength = li.length, i = 0, heightMaxLi = 0;
	for(i; i < liLength; i++){
		if (li.eq(i).height() > heightMaxLi){
			heightMaxLi = li.eq(i).height();
		}
	}
	context.find('ul').css('height', heightMaxLi+"px");
}

function initAnnonces(){
	TweenMax.set($(".whr-item"), {display:"block"});
}

/* Positionnement des images diapos dans la page Emploi */
function positionDiapos(){
	$("#slider-diapos li").each(function(index){
		if($(this).hasClass("half")){
			// Si l'image a une demi-hauteur
			if(precWidth!==0){
				// Si l'image d'avant est en haut
				var newWidth=$(this).outerWidth();
				if(newWidth<=precWidth){
					// Si la nouvelle image n'est pas plus large que celle du haut
					TweenMax.set($(this), {top: "50%", left: avancementLeft+avancementLeftBottom+"px"});
					// Mise à jour du precWidth
					precWidth-=newWidth;
					hasDemiBefore=true;
					avancementLeftBottom+=$(this).outerWidth();
				}else{
					// Si la nouvelle image est plus large que celle du haut
					avancementLeft+=avancementLeftFuture;
					TweenMax.set($(this), {top: "0", left: avancementLeft+"px"});
					avancementLeftFuture=$(this).outerWidth();
					hasDemiBefore=false;
					avancementLeftBottom=0;
				}
			}else{
				// Si l'image d'avant n'est pas en haut
				avancementLeft+=avancementLeftFuture;
				TweenMax.set($(this), {top: "0px", left: avancementLeft+"px"});
				precWidth = $(this).outerWidth();
				avancementLeftFuture = $(this).outerWidth();
				hasDemiBefore = false;
				avancementLeftBottom = 0;
			}
		}else{
			// Si l'image n'a pas une demi-hauteur
			// On met à jour l'avancement
			avancementLeft+=avancementLeftFuture;
			avancementLeftFuture=0;
			TweenMax.set($(this), {top: "0px", left: avancementLeft+"px"});
			avancementLeft+=$(this).outerWidth();
			hasDemiBefore = false;
			avancementLeftBottom = 0;
			precWidth=0;
			hasDemiBefore=false;
		}
	});
	TweenMax.set($("#slider-diapos"), {width: avancementLeft+avancementLeftFuture+"px"});
	Draggable.create("#slider-diapos", {type:"x", edgeResistance:0.65, bounds:"#container-slider-diapos", throwProps:true});
}

/**** SLIDER VALUES MISSION ****/

var unit = 200, // padding inclus
	unitNaked = 122, // padding non inclus
	bigUnitDelta = 338 - unit, // padding inclus
	bigUnit = 260, // padding non inclus
	total = 5,
	numActive = 3,
	spee = 0.4;
//
// actif : gros et en couleur
function makeActive(numToActivate){
	// remettre les autres à 0
	TweenMax.to($("#slider-visu-mission li").find("a"), spee, {"width": unitNaked+"px","height": unitNaked+"px", ease:Linear.easeIn});
	TweenMax.to($("#slider-visu-mission li"), spee, {"width": unitNaked+"px", ease:Linear.easeIn});
	$("#slider-visu-mission li").removeClass("active");
	// passer en activ
	TweenMax.to($("#slider-visu-mission li").eq(numToActivate).find("a"), spee, {"width": bigUnit+"px","height": bigUnit+"px", ease:Linear.easeIn});
	TweenMax.to($("#slider-visu-mission li").eq(numToActivate), spee, {"width": bigUnit+"px", ease:Linear.easeIn, onComplete:purgeMission});
	$("#slider-visu-mission li").eq(numToActivate).addClass("active");
}
// slide
<<<<<<< HEAD
function slideMission(indexMiss) {
	TweenMax.to($("ul#slider-visu-mission"), spee, {"margin-left": -indexMiss*unit-(total*unit+bigUnitDelta)/2-1+"px", ease:Linear.easeIn});
	TweenMax.to($("ul#slider-txt-mission"), spee, {"margin-left": -(indexMiss+2)*$('#wrapper-slider-visu-mission').width()-1+"px", ease:Linear.easeIn});
=======
function slideMission(indexMiss){
	TweenMax.to($("#slider-visu-mission"), spee, {"margin-left": -indexMiss*unit-(total*unit+bigUnitDelta)/2+"px", ease:Linear.easeIn});
	TweenMax.to($("#slider-txt-mission"), spee, {"margin-left": -(indexMiss+2)*$('#wrapper-slider-visu-mission').width()-6+"px", ease:Linear.easeIn});
>>>>>>> origin/master
	makeActive(indexMiss+2);
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
// taille du slider
function setSizeMission(){
	TweenMax.set($("#slider-txt-mission"), {width: $("#slider-visu-mission li").length*$('#wrapper-slider-visu-mission').width()+"px"});
	TweenMax.set($("#slider-txt-mission li"), {width: $('#wrapper-slider-visu-mission').width()+"px"});
	TweenMax.set($("#slider-visu-mission"), {width: $("#slider-visu-mission li").length*unit+bigUnitDelta+"px"});
}
// on positionne 
function posSlideMission(){
	setSizeMission();
<<<<<<< HEAD
	var myIndex = $("ul#slider-visu-mission li.active").index()-2;
	TweenMax.set($("ul#slider-visu-mission"), {"left":"50%", "margin-left": -myIndex*unit-(total*unit+bigUnitDelta)/2+"px", ease:Linear.easeIn});
	TweenMax.set($("ul#slider-txt-mission"), {"margin-left": -(myIndex+2)*$('#wrapper-slider-visu-mission').width()+"px", ease:Linear.easeIn});
=======
	var myIndex = $("#slider-visu-mission li.active").index()-2;
	$("#slider-visu-mission").css({"left":"50%","margin-left": -myIndex*unit-(total*unit+bigUnitDelta)/2+"px"});
	$("#slider-txt-mission").css({"margin-left": (-myIndex-2)*$('#wrapper-slider-visu-mission').width()+"px"});
>>>>>>> origin/master
}
// on rajoute le premier élément à la fin
function addEntityMission(){
	$("#slider-txt-mission li").eq($("#slider-txt-mission li").length-total).clone().appendTo("#slider-txt-mission");
	$("#slider-visu-mission li").eq($("#slider-visu-mission li").length-total).clone().appendTo("#slider-visu-mission");
	setSizeMission();
	// mappage du clic du nouveau
	$('#slider-visu-mission li').eq($("#slider-visu-mission li").length-1).find('a').unbind('click');
	$('#slider-visu-mission li').eq($("#slider-visu-mission li").length-1).find('a').on('click', clickOnMission);
}
// on rajoute le dernier élément au début
function addEntityMissionAtBeginning(){
	$("#slider-txt-mission li").eq($("#slider-txt-mission li").first().index()+4).clone().prependTo("#slider-txt-mission");
	$("#slider-visu-mission li").eq($("#slider-visu-mission li").first().index()+4).clone().prependTo("#slider-visu-mission");
	posSlideMission();
	// mappage du clic du nouveau
	$('#slider-visu-mission li').first().find('a').unbind('click');
	$('#slider-visu-mission li').first().find('a').on('click', clickOnMission);
}
// de temps en temps, supprimer qui ne servent à rien pour libérer le DOM
function purgeMission(){
	if ($("#slider-visu-mission li").length > 10) {
		// si on est vers la fin
<<<<<<< HEAD
		if ($("ul#slider-visu-mission li.active").index()>5) {
			$("ul#slider-visu-mission li").first().remove();
			$("ul#slider-txt-mission li").first().remove();
			$("ul#slider-visu-mission li").first().remove();
			$("ul#slider-txt-mission li").first().remove();
		}
		// si on est vers le début
		if ($("ul#slider-visu-mission li.active").index()<$("ul#slider-visu-mission li").length-5) {
			$("ul#slider-visu-mission li").last().remove();
			$("ul#slider-txt-mission li").last().remove();
			$("ul#slider-visu-mission li").last().remove();
			$("ul#slider-txt-mission li").last().remove();
=======
		if ($("#slider-visu-mission li.active").index()>5) {
			$("#slider-visu-mission li").first().remove();
			$("#slider-visu-mission li").first().remove();
		}
		// si on est vers le début
		if ($("#slider-visu-mission li.active").index()<$("#slider-visu-mission li").length-5) {
			$("#slider-visu-mission li").last().remove();
			$("#slider-visu-mission li").last().remove();
>>>>>>> origin/master
		}
	}
	posSlideMission();
}
// suivant/précédent
function nextMission(e){
	e.preventDefault();	
	addEntityMission();
	// mouvement
	slideMission($("#slider-visu-mission li.active").index()-1);
}
/*function prevMission(e){
	e.preventDefault();	
	addEntityMissionAtBeginning();
	// mouvement
	slideMission($("#slider-visu-mission li.active").index()+1);
}*/

// initailisation
function sliderMission(){
	// au départ, on en pré-ajoute un
	addEntityMission();
	posSlideMission();
	makeActive(numActive-1);
	// au clic sur suivant
	$('#next-slider-mission').on('click', nextMission);
	// mappage des clics
	$('#slider-visu-mission li a').on('click', clickOnMission);
}

/**** INIT ****/
$(function(){

	// No-mobile //
	if(!isMobile.any){
		htmlTag.addClass("no-mobile");
	}

	if(!body.hasClass('landing')){
		// Make links not active in grey //
		setActiveMenu();

		// Lang selector //
		if(htmlTag.attr('lang') !== 'fr-FR'){
			langSelector();
		}

		// Sous menu //
		setSubMenu();
	}

	if(body.hasClass("page-template-emploi")){
		initAnnonces();
		sliderSmall = $(window).width()>767 ? false : true;
	}

	if(body.hasClass("page-template-mission")){
		sliderMission();
	}

	// Scroll init //
	scrollPage();

	// RDV / Clients filtres //
	if( $('.filtres').find('.actif').length ){
		goToContent();
	}

	// Size map //
	if( $('#map').length ){
		setMapSize();
	}

	// Responsive menu //
	burger.on('click', responsiveMenu);
	$('#triangleMenu').on('click', function(){
		burger.removeClass('actif');
		header.removeClass('menuVisible');
		$('#container').css({height: 'auto', overflow: 'visible'});
	});

	// Slider footer //
	if($(window).width() > 450 && !htmlTag.hasClass('lt-ie9') && $('.buttonsTeam').length){
		setDraggableButton();
	} 

	// Changement de slider au clic btn footer (entreprise, agence, etc...) //
	$('.buttonsTeam').find('button').on('click', function(){ setSliderTeamProfil($(this)); openForm(); });

	// Btn demande de contact footer //
	btnContact.on('click', openForm);
	if($('.formContact').hasClass('open')){
		openForm();
	}	
	$('.bottomHeader').find('.btnFull').on('click', function(e){
		if(header.hasClass('menuVisible')){
			responsiveMenu();
		}
		e.preventDefault();
		if(!htmlTag.hasClass('lt-ie9')){ 
			htmlBody.animate({scrollTop: $('#contactezNous').offset().top - 100}, 800, 'easeInOutCubic');
			setTimeout(openForm, 500); 
		}else{
			htmlBody.animate({scrollTop: $('#contactezNous').offset().top}, 800, 'easeInOutCubic');
		}	
	});
	$('.home .blocH1').find('.btnFull').on('click', function(e){
		e.preventDefault();
		htmlBody.animate({scrollTop: $('#contactezNous').offset().top - 100}, 800, 'easeInOutCubic');
		if(!htmlTag.hasClass('lt-ie9')){ 
			htmlBody.animate({scrollTop: $('#contactezNous').offset().top - 100}, 800, 'easeInOutCubic');
			setTimeout(openForm, 500); 
		}else{
			htmlBody.animate({scrollTop: $('#contactezNous').offset().top}, 800, 'easeInOutCubic');
		}
	});

	// Changement label entreprise selon profil //
	$('#profil').change(function(){
		$('#labelEnt').html($(this).val() + ' *');
	});

	// Textarea footer autogrow //
	if($('#message').length){
	    $('#message').autoGrowTextArea();
	}

	// Petites fleches //
	$('.scrollNext').on('click', goToNextSection);

	// Btn video //
	$('#btn-video').on('click', videoCover);

	// Landing livre blanc formulaire //
	if($('.form').hasClass('open')){
		htmlBody.animate({scrollTop: $('.form').offset().top}, 800, 'easeInOutCubic');
	}	
	

	$(window).load(function(){
		// Photo header //
		heightBgHead();

		if(!body.hasClass('landing')){
			// Sous menu //
			centerSubMenu();

			// Anim triangles header + footer //
			scrollMagic();
		}

		if(body.hasClass("home")){
			// Logos presse //
			randomLogosPress();
		}

		if(body.hasClass("page-template-emploi")){
			positionDiapos();
		}

		// Slider ref home //
		if($('#sliderRef').length){
			setToolTip($('#sliderRef'));
			$('#sliderRef').contentcarousel({ sliderEasing: 'easeOutExpo' });
		}

		// Slider footer //
		if($('#sliderTeam').length){
			setSliderTeam($('.slidesTeam').eq(0));
		}

		// Slider landing livre blanc //
		if($('#sliderBooks').length){
			$('#sliderBooks').contentcarousel({ sliderEasing: 'easeOutExpo' });
		}

		// Tooltip etudes de cas //
		if($('#etudes').length){
			setToolTip($('#etudes'));
		}

		// Slider clients ils nous font confiance //
		if($('#sliderLogosConfiance').length){
			setSliderHeight($('#sliderLogosConfiance'));
			$('#sliderLogosConfiance').contentcarousel({ sliderEasing: 'easeOutExpo' });
		}

		// Slider témoignages //
		if($('#sliderTemoignages').length){
			setSliderHeight($('#sliderTemoignages'));
			$('#sliderTemoignages').contentcarousel({ sliderEasing: 'easeOutExpo' });
		}

		// Slider clients ils nous ont accueillis //
		if($('#sliderLogosAccueillis').length){
			setSliderHeight($('#sliderLogosAccueillis'));
			$('#sliderLogosAccueillis').contentcarousel({ sliderEasing: 'easeOutExpo' });
		}

		// Slider Wisembly vous invite //
		if($('#slider-invite').length){
			setSliderHeightLi($('#slider-invite'));
			$('#slider-invite').contentcarousel({ sliderEasing: 'easeOutExpo' });
		}

		// Slider Wisembly vous invite //
		if($('#slider-on-parle-de-nous').length){
			setSliderHeightLi($('#slider-on-parle-de-nous'));
			$('#slider-on-parle-de-nous').contentcarousel({ sliderEasing: 'easeOutExpo' });
		}

		// Slider Visez au plus juste //
		if($('#slider-visez-juste').length){
			setSliderHeightLi($('#slider-visez-juste'));
			$('#slider-visez-juste').contentcarousel({ sliderEasing: 'easeOutExpo' });
		}

		// Slider Capitalisez sur tout le contenu de votre événement //
		if($('#slider-contenu-evenement').length){
			setSliderHeightLi($('#slider-contenu-evenement'));
			$('#slider-contenu-evenement').contentcarousel({ sliderEasing: 'easeOutExpo' });
		}
		
		// Slider Engagez votre audience //
		if($('#slider-engagez-audience').length){
			setSliderHeightLi($('#slider-engagez-audience'));
			$('#slider-engagez-audience').contentcarousel({ sliderEasing: 'easeOutExpo' });
		}

		// Slider Concentrez vos cours //
		if($('#slider-concentrez-cours').length){
			setSliderHeightLi($('#slider-concentrez-cours'));
			$('#slider-concentrez-cours').contentcarousel({ sliderEasing: 'easeOutExpo' });
		}

		
	});

    $(window).resize(function(){

    	heightBgHead();

    	if(!body.hasClass('landing')){
    		minHeight = $('.menu').innerHeight() - 10;
    		fixedHeader();
    		setSubMenu();
    		centerSubMenu();
    		setPosBtnMenu();
    	}
    	
	    if(header.hasClass('menuVisible') && $(window).width() > 1040){
	    	responsiveMenu();
	    }

	    // Size map //
	    if( $('#map').length ){
	    	setMapSize();
	    }

	    if($('#sliderTemoignages').length){
	    	setSliderHeight($('#sliderTemoignages'));
	    }

	    if($('#slider-invite').length){
			setSliderHeightLi($('#slider-invite'));
		}

		if($('#sliderLogosConfiance').length){
			setSliderHeight($('#sliderLogosConfiance'));
		}

		if($('#sliderTemoignages').length){
			setSliderHeight($('#sliderTemoignages'));
		}

		if($('#sliderLogosAccueillis').length){
			setSliderHeight($('#sliderLogosAccueillis'));
		}

		if($('#slider-invite').length){
			setSliderHeightLi($('#slider-invite'));
		}

		if($('#slider-on-parle-de-nous').length){
			setSliderHeightLi($('#slider-on-parle-de-nous'));
		}

		if($('#next-slider-mission').length){
			posSlideMission();
		}

		if($('#slider-visez-juste').length){
			setSliderHeightLi($('#slider-visez-juste'));
		}

		if($('#slider-contenu-evenement').length){
			setSliderHeightLi($('#slider-contenu-evenement'));
		}
		
		if($('#slider-engagez-audience').length){
			setSliderHeightLi($('#slider-engagez-audience'));
		}

		if($('#slider-concentrez-cours').length){
			setSliderHeightLi($('#slider-concentrez-cours'));
		}

	    if(body.hasClass("page-template-emploi")){
	    	//initAnnonces();
	    	/*sliderSmall = $(window).width()>767 ? false : true ;
	    	if(sliderSmall){
	    		avancementLeft = 0;
	    		avancementLeftFuture = 0;
	    		precWidth = 0;
	    		hasDemiBefore = false;
	    		avancementLeftBottom = 0;
	    		positionDiapos();
	    	}*/
	    }
	});

});