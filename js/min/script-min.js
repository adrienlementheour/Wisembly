function scrollMenu(){myScroll>100?header.addClass("on"):header.removeClass("on"),requestAnimFrame(scrollMenu)}function setSliderTeam(e){function t(){var e=$(this).parents("li").index();n.eq(e).hasClass("on")||($(this).addClass("actif").parents("li").siblings().find("button").removeClass("actif"),n.eq(e).addClass("on").animate({opacity:1},600).siblings().animate({opacity:0},600).removeClass("on"))}var n=e.find(".slideTeam"),i=n.length,o=0,a=$(".navTeam"),s="<li><button>•</button></li>",l=$(".slidesTeam"),r=l.length,c=0,d;for(c;r>c;c++)l.eq(c).hasClass("on")||l.eq(c).css("opacity",0);if(a.html(""),i>1)for(o;i>o;o++)a.append(s),n.eq(o).hasClass("on")?d=o:n.eq(o).css("opacity",0);a.find("button").eq(d).addClass("actif"),a.find("button").on("click",t)}function setSliderTeamProfil(){var e=$(this).parents("li").index(),t=$(".slidesTeam"),n=t.eq(e);$(this).addClass("actif").parents("li").siblings().find("button").removeClass(),n.hasClass("on")||(n.addClass("on").animate({opacity:1},600).siblings(".slidesTeam").animate({opacity:0},600).removeClass("on"),setSliderTeam(n))}function goToNextSection(){htmlBody.animate({scrollTop:$(this).parents("section").next("section").offset().top-100},400)}function onYouTubeIframeAPIReady(){player1=new YT.Player("player-1")}var myScroll,header=$("header"),htmlBody=$("html, body");window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();var tag=document.createElement("script");tag.src="https://www.youtube.com/player_api";var firstScriptTag=document.getElementsByTagName("script")[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);var player1;$(function(){function e(){isMobile.phone||player1.playVideo()}scrollMenu(),$("#demandeContact").on("click",function(){$(this).animate({opacity:0},200,function(){$(this).css("display","none"),$("#contact, #bulle").addClass("visible")})}),$(".buttonsTeam").find("button").on("click",setSliderTeamProfil),$(".scrollNext").on("click",goToNextSection),$("#btn-video").on("click",function(){var t=new TimelineMax({onComplete:e});return t.to($(".zone-txt-cover-video"),.2,{y:"100px",opacity:"0",ease:Cubic.easeInOut}),t.to($(".bg-cover-video"),.5,{rotationZ:1,rotation:"-45deg",y:"-100%",transformOrigin:"left bottom",ease:Cubic.easeInOut}),t.set($(".cover-video"),{display:"none"}),!1}),$(window).load(function(){$("#sliderTeam").length&&setSliderTeam($(".slidesTeam").eq(0))}),$(document).scroll(function(){myScroll=$(document).scrollTop()}),$(window).resize(function(){})});