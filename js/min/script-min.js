function fixedHeader(){$(window).width()>1040&&(myScroll>100?header.addClass("on"):header.removeClass("on"))}function scrollPage(){myScroll=$(document).scrollTop(),fixedHeader(),requestAnimFrame(scrollPage)}function setSubMenu(){$(window).width()>1040&&$(".hasSubMenu").on("mouseover",function(){$(this).addClass("actifHover")}).on("mouseout",function(){$(this).removeClass("actifHover")})}function responsiveMenu(){$(this).toggleClass("actif"),$(this).parents("nav").toggleClass("visible")}function setSliderTeam(e){function o(){var e=$(this).parents("li").index();t.eq(e).hasClass("on")||($(this).addClass("actif").parents("li").siblings().find("button").removeClass("actif"),t.eq(e).addClass("on").animate({opacity:1},600).siblings().animate({opacity:0},600).removeClass("on"))}var t=e.find(".slideTeam"),n=t.length,a=0,i=$(".navTeam"),s="<li><button>•</button></li>",l=$(".slidesTeam"),r=l.length,c=0,d;for(c;r>c;c++)l.eq(c).hasClass("on")||l.eq(c).css("opacity",0);if(i.html(""),n>1)for(a;n>a;a++)i.append(s),t.eq(a).hasClass("on")?d=a:t.eq(a).css("opacity",0);i.find("button").eq(d).addClass("actif"),i.find("button").on("click",o)}function setSliderTeamProfil(){var e=$(this).parents("li").index(),o=$(".slidesTeam"),t=o.eq(e),n=$(".contactFooter");$(this).addClass("actif").parents("li").siblings().find("button").removeClass(),0===e?n.addClass("bleu").removeClass("rose").removeClass("rouge").removeClass("vert"):1===e?n.addClass("rouge").removeClass("rose").removeClass("bleu").removeClass("vert"):2===e?n.addClass("vert").removeClass("rose").removeClass("rouge").removeClass("bleu"):3===e&&n.addClass("rose").removeClass("bleu").removeClass("rouge").removeClass("vert"),t.hasClass("on")||(t.addClass("on").animate({opacity:1},600).siblings(".slidesTeam").animate({opacity:0},600).removeClass("on"),setSliderTeam(t))}function goToNextSection(){htmlBody.animate({scrollTop:$(this).parents("section").next("section").offset().top-100},400)}function onYouTubeIframeAPIReady(){player1=new YT.Player("player-1")}function scrollMagic(){var e=new ScrollMagic,o=TweenMax.to([$("#triangle-footer-top-bleu-fonce"),$("#triangle-footer-bottom-bleu-clair")],1.2,{rotation:"-3deg",force3D:!0,lazy:!0}),t=TweenMax.to($("#triangle-footer-top-bleu-clair"),1.2,{rotation:"3deg",force3D:!0,lazy:!0}),n=TweenMax.to($("#triangle-footer-bottom-blanc"),1.2,{rotation:"-3deg",force3D:!0,lazy:!0}),a=TweenMax.to($(".triangle-menu-footer"),1.2,{rotation:"-3deg",y:"0px",force3D:!0,lazy:!0}),i=TweenMax.to($(".scrollNext1"),1.2,{rotation:"-3deg",force3D:!0,lazy:!0}),s=TweenMax.to($(".scrollNext2"),1.2,{rotation:"-3deg",force3D:!0,lazy:!0}),l=TweenMax.to($(".scrollNext3"),1.2,{rotation:"-3deg",force3D:!0,lazy:!0}),r=new ScrollScene({triggerElement:".contactFooter",duration:$(".contactFooter").outerHeight(),offset:-300,loglevel:3}).setTween(o).addTo(e),c=new ScrollScene({triggerElement:".contactFooter",duration:$(".contactFooter").outerHeight(),offset:-400,loglevel:3}).setTween(t).addTo(e),d=new ScrollScene({triggerElement:"#container-3",duration:$("#container-3").outerHeight(),offset:0,loglevel:3}).setTween(n).addTo(e),u=new ScrollScene({triggerElement:".menuFooter",duration:$(".menuFooter").outerHeight(),offset:-300,loglevel:3}).setTween(a).addTo(e),m=new ScrollScene({triggerElement:".scrollNext1",duration:$(".scrollNext1").outerHeight(),offset:-300,loglevel:3}).setTween(i).addTo(e),f=new ScrollScene({triggerElement:".scrollNext2",duration:$(".scrollNext2").outerHeight(),offset:-300,loglevel:3}).setTween(s).addTo(e),g=new ScrollScene({triggerElement:".scrollNext3",duration:$(".scrollNext3").outerHeight(),offset:-300,loglevel:3}).setTween(l).addTo(e)}var myScroll,header=$("header"),htmlBody=$("html, body");window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();var tag=document.createElement("script");tag.src="https://www.youtube.com/player_api";var firstScriptTag=document.getElementsByTagName("script")[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);var player1;$(function(){function e(){isMobile.phone||player1.playVideo()}scrollPage(),setSubMenu(),$("#burger").on("click",responsiveMenu),$("#demandeContact").on("click",function(){$(this).animate({opacity:0},200,function(){$(this).css("display","none"),$("#contact, #bulle").addClass("visible")})}),$(".buttonsTeam").find("button").on("click",setSliderTeamProfil),$(".scrollNext").on("click",goToNextSection),$("#btn-video").on("click",function(){var o=new TimelineMax({onComplete:e});return o.to($(".zone-txt-cover-video"),.2,{y:"100px",opacity:"0",ease:Cubic.easeInOut}),o.to($(".bg-cover-video"),.5,{rotationZ:1,rotation:"-45deg",y:"-100%",transformOrigin:"left bottom",ease:Cubic.easeInOut}),o.set($(".cover-video"),{display:"none"}),!1}),scrollMagic(),$(window).load(function(){$("#sliderRef").length&&$("#sliderRef").contentcarousel({sliderSpeed:500,sliderEasing:"easeOutExpo",itemSpeed:500,itemEasing:"easeOutExpo",scroll:1}),$("#sliderTeam").length&&setSliderTeam($(".slidesTeam").eq(0))}),$(document).scroll(function(){}),$(window).resize(function(){fixedHeader(),setSubMenu()})});