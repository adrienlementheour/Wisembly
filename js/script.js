/**** VARIABLES ****/
var myScroll,
	header = $('header');


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
function scrollMenu(){
	myScroll > 100 ? header.addClass('on') : header.removeClass('on');
	requestAnimFrame(scrollMenu);
}


/**** INIT ****/
$(function(){

	scrollMenu();
	
	$('.buttonsEquipe').find('button').on('click', function(){
		$(this).addClass('actif').parents('li').siblings().find('button').removeClass();
	});

	$(window).load(function(){
	});

    $(document).scroll(function(){
    	myScroll = $(document).scrollTop();
    });

    $(window).resize(function(){
	});

});