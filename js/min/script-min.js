function fixedHeader(){$(window).width()>1040&&!isMobile.any&&(myScroll>100?header.addClass("on"):header.removeClass("on"))}function apparitionFooter(){isMobile.any||($(".navFooter").isOnScreen()?TweenMax.set($(".rsFooter"),{visibility:"visible"}):TweenMax.set($(".rsFooter"),{visibility:"hidden"}))}function scrollPage(){myScroll=$(document).scrollTop(),fixedHeader(),apparitionFooter(),body.hasClass("home")&&!$("html").hasClass("lt-ie10")&&(isMobile.any||myScroll<$(".headHome").height()&&TweenMax.set($("#bgHeadHome"),{y:-(myScroll/1.5)+"px"})),requestAnimFrame(scrollPage)}function setSubMenu(){var e=$(".subMenu");if($(window).width()>1040){if($(".hasSubMenu").on("mouseover",function(){$(this).addClass("actifHover")}).on("mouseout",function(){$(this).removeClass("actifHover")}),!$("html").hasClass("lt-ie9")){var t=e.length,o=0,n,i,a,s,r,l,d,c,u,m;for(o;t>o;o++){for(i=e.eq(o).find("li"),a=i.length,n=0,r=0,n;a>n;n++)r+=i.eq(n).outerWidth();l=r/2,d=e.eq(o).parents(".hasSubMenu"),c=d.outerWidth()/2,u=d.offset().left,m=c+u-l,e.eq(o).css("padding-left",m+"px")}}}else $(".hasSubMenu").unbind(),$("html").hasClass("lt-ie9")||$(".subMenu").css("padding-left",0)}function hoverMenu(){$(".menu").find("li").on("mouseover",function(){TweenMax.to($("#triangle-top-header"),.2,{css:{y:"-60px",force3D:!0}})}).on("mouseout",function(){TweenMax.to($("#triangle-top-header"),.2,{css:{y:"0px",force3D:!0}})})}function responsiveMenu(){var e=$(window).height()-header.height(),t=$("#container");burger.hasClass("actif")?t.css({height:"auto",overflow:"visible"}):(burger.css({opacity:0}).delay(10).animate({opacity:1},100),t.height(e>340?e:"340px"),t.css("overflow","hidden")),burger.toggleClass("actif"),header.toggleClass("menuVisible")}function setSliderTeam(e){function t(){var e=$(this).parents("li").index();o.eq(e).hasClass("on")||($(this).addClass("actif").parents("li").siblings().find("button").removeClass("actif"),o.eq(e).siblings().stop().animate({opacity:0,marginBottom:"-50px"},400,function(){o.eq(e).siblings().removeClass("on"),o.eq(e).addClass("on").stop().animate({opacity:1,marginBottom:0},400)}))}var o=e.find(".slideTeam"),n=o.length,i=0,a=$(".navTeam"),s="<li><button>•</button></li>",r=$(".slidesTeam"),l=r.length,d=0,c;for(d;l>d;d++)r.eq(d).hasClass("on")||r.eq(d).css({opacity:0,bottom:"-165px"});if(a.html(""),n>1)for(i;n>i;i++)a.append(s),o.eq(i).hasClass("on")?c=i:o.eq(i).css({opacity:0,marginBottom:"-50px"});a.find("button").eq(c).addClass("actif"),a.find("button").on("click",t)}function setSliderTeamProfil(e){var t=e.parents("li").index(),o=$(".slidesTeam"),n=o.eq(t),i=$(".contactFooter");e.addClass("actif").parents("li").siblings().find("button").removeClass(),n.hasClass("on")||n.siblings(".slidesTeam").stop().animate({opacity:0,bottom:"-165px"},400,function(){n.siblings(".slidesTeam").removeClass("on"),n.addClass("on").stop().animate({opacity:1,bottom:"-115px"},400),0===t?(TweenLite.set($("#drag"),{x:0}),i.addClass("bleu").removeClass("rose").removeClass("rouge").removeClass("vert")):1===t?(TweenLite.set($("#drag"),{x:130}),i.addClass("rouge").removeClass("rose").removeClass("bleu").removeClass("vert")):2===t?(TweenLite.set($("#drag"),{x:235}),i.addClass("vert").removeClass("rose").removeClass("rouge").removeClass("bleu")):3===t&&(TweenLite.set($("#drag"),{x:334}),i.addClass("rose").removeClass("bleu").removeClass("rouge").removeClass("vert")),setSliderTeam(n)})}function setDraggableButton(){$("#demandeContact").before("<div id='dragIn'><div id='drag'></div></div>"),Draggable.create("#drag",{type:"x",bounds:$("#dragIn"),cursor:"pointer",throwProps:!0,snap:[0,130,235,334],onThrowComplete:function(){var e;0==this.x&&(e=$(".buttonsTeam").find("button").eq(0)),130==this.x&&(e=$(".buttonsTeam").find("button").eq(1)),235==this.x&&(e=$(".buttonsTeam").find("button").eq(2)),334==this.x&&(e=$(".buttonsTeam").find("button").eq(3)),setSliderTeamProfil(e)}})}function goToNextSection(){htmlBody.animate({scrollTop:$(this).parents("section").next("section").offset().top-100},400)}function onYouTubeIframeAPIReady(){player1=new YT.Player("player-1")}function videoCover(){function e(){isMobile.phone||player1.playVideo()}var t=new TimelineMax({onComplete:e});return t.to($(".zone-txt-cover-video"),.2,{y:"100px",opacity:"0",ease:Cubic.easeInOut}).to($(".bg-cover-video"),.5,{rotationZ:1,rotation:"-45deg",y:"-100%",transformOrigin:"left bottom",ease:Cubic.easeInOut}).set($(".cover-video"),{display:"none"}),!1}function heightBgHeadHome(){if(isMobile.any)var e=$(".headHome").height()+"px";else var e=$(".headHome").height()+"px";TweenMax.set($("#bgHeadHome"),{height:e})}function scrollMagic(){if($(window).width()>767)var e=new ScrollMagic,t=TweenMax.to($("#triangle-top-header"),1.2,{css:{y:"0px",rotation:"0deg",force3D:!0}}),o=TweenMax.to($("#triangle-header-vert"),1.2,{css:{rotation:"7deg",force3D:!0}}),n=TweenMax.to($("#triangle-header-blanc"),1.2,{css:{rotation:"-3deg",force3D:!0}}),i=TweenMax.to($("#triangle-footer-top-bleu-fonce"),1.2,{css:{rotation:"-3deg",force3D:!0}}),a=TweenMax.to($("#triangle-footer-top-bleu-clair"),1.2,{css:{rotation:"3deg",force3D:!0}}),s=TweenMax.to($("#triangle-footer-bottom-bleu-clair"),1.2,{css:{rotation:"-3deg",force3D:!0}}),r=TweenMax.to($("#triangle-footer-bottom-blanc"),1.2,{css:{rotation:"-3deg",force3D:!0}}),l=TweenMax.to($(".triangle-menu-footer"),1.2,{css:{rotation:"-3deg",y:"0px",opacity:"1",force3D:!0}}),d=TweenMax.to($(".scrollNext1"),1.2,{rotation:"-3deg",force3D:!0,lazy:!0}),c=TweenMax.to($(".scrollNext2"),1.2,{rotation:"-3deg",force3D:!0,lazy:!0}),u=TweenMax.to($(".scrollNext3"),1.2,{rotation:"-3deg",force3D:!0,lazy:!0}),m=TweenMax.to($(".barre-footer"),1.2,{rotation:"-3deg",force3D:!0,lazy:!0}),g=new ScrollScene({triggerElement:".headHome",duration:$(".headHome").outerHeight()/3,offset:500}).setTween(o).addTo(e),g=new ScrollScene({triggerElement:".headHome",duration:$(".headHome").outerHeight()/3,offset:500}).setTween(n).addTo(e),f=new ScrollScene({triggerElement:".contactFooter",duration:$(".contactFooter").outerHeight(),offset:-300}).setTween(i).addTo(e),h=new ScrollScene({triggerElement:".contactFooter",duration:$(".contactFooter").outerHeight(),offset:-400}).setTween(a).addTo(e),b=new ScrollScene({triggerElement:"#container3",duration:$("#container3").outerHeight(),offset:-400}).setTween(s).addTo(e),w=new ScrollScene({triggerElement:"body",duration:$("#container3").outerHeight(),offset:$(document).height()-$(window).height()+$("#container3").height()-50}).setTween(r).addTo(e),p=new ScrollScene({triggerElement:".menuFooter",duration:$(".menuFooter").outerHeight(),offset:-300}).setTween(l).addTo(e),T=new ScrollScene({triggerElement:".scrollNext1",duration:200,offset:-300}).setTween(d).addTo(e),v=new ScrollScene({triggerElement:".scrollNext2",duration:200,offset:-300}).setTween(c).addTo(e),x=new ScrollScene({triggerElement:".scrollNext3",duration:200,offset:-300}).setTween(u).addTo(e),y=new ScrollScene({triggerElement:".navFooter",duration:$(".rsFooter").height(),offset:-50}).setTween(m).addTo(e)}var myScroll,header=$("header"),htmlBody=$("html, body"),body=$("body"),burger=$("#burger");window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}(),$.fn.isOnScreen=function(){var e=$(window),t={top:e.scrollTop(),left:e.scrollLeft()};t.right=t.left+e.width(),t.bottom=t.top+e.height();var o=this.offset();return o.right=o.left+this.outerWidth(),o.bottom=o.top+this.outerHeight(),!(t.right<o.left||t.left>o.right||t.bottom<o.top||t.top>o.bottom)};var tag=document.createElement("script");tag.src="https://www.youtube.com/player_api";var firstScriptTag=document.getElementsByTagName("script")[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);var player1;$(function(){scrollPage(),setSubMenu(),hoverMenu(),isMobile.any||$("html").addClass("no-mobile"),body.hasClass("home")&&!$("html").hasClass("lt-ie10")&&(isMobile.any||TweenMax.set($("#bgHeadHome"),{position:"fixed"}),TweenMax.set($("#bgHeadHome"),{height:$(".headHome").height()+"px"})),body.hasClass("home")&&heightBgHeadHome(),burger.on("click",responsiveMenu),$("#triangleMenu").on("click",function(){burger.removeClass("actif"),header.removeClass("menuVisible"),$("#container").css({height:"auto",overflow:"visible"})}),$("#demandeContact").on("click",function(){$(this).animate({opacity:0},250,function(){$(this).css("display","none"),$("#contact, #bulle").delay(10).addClass("visible"),$("#nom").focus()}),$("html").hasClass("lt-ie9")&&$("#sliderTeam").height("500px")}),$(".buttonsTeam").find("button").on("click",function(){setSliderTeamProfil($(this))}),$(window).width()>450&&!$("html").hasClass("lt-ie9")&&setDraggableButton(),$(".scrollNext").on("click",goToNextSection),$("#btn-video").on("click",videoCover),$(window).load(function(){scrollMagic(),$("#sliderRef").length&&$("#sliderRef").contentcarousel({sliderSpeed:500,sliderEasing:"easeOutExpo",itemSpeed:500,itemEasing:"easeOutExpo",scroll:1}),$("#sliderTeam").length&&setSliderTeam($(".slidesTeam").eq(0))}),$(document).scroll(function(){}),$(window).resize(function(){fixedHeader(),setSubMenu(),body.hasClass("home")&&heightBgHeadHome(),header.hasClass("menuVisible")&&responsiveMenu()})});