!function($){var t={navigate:function(t,e,n,i,s){var o=i.scroll,r=1,c=0;if(s.expanded&&(o=1,r=3,c=s.idxClicked),1===t)n.find(".ref:lt("+o+")").each(function(t){$(this).clone(!0).css("left",(s.totalItems-c+t)*s.itemW*r+"px").appendTo(n)});else{var a=n.children().eq(0);n.find(".ref:gt("+(s.totalItems-1-o)+")").each(function(t){$(this).clone(!0).css("left",-(o-t+c)*s.itemW*r+"px").insertBefore(a)})}n.find(".ref").each(function(e){var n=$(this);n.stop().animate({left:1===t?"-="+s.itemW*r*o+"px":"+="+s.itemW*r*o+"px"},i.sliderSpeed,i.sliderEasing,function(){(1===t&&n.position().left<-c*s.itemW*r||-1===t&&n.position().left>(s.totalItems-1-c)*s.itemW*r)&&n.remove(),s.isAnimating=!1})})},getWinPos:function(t,e){switch(t){case 0:return 1;break;case e.itemW:return 2;break;case 2*e.itemW:return 3}}},e={init:function(e){if(this.length){var n={sliderSpeed:500,sliderEasing:"easeInOutCubic",itemSpeed:500,itemEasing:"easeInOutCubic",scroll:1};return this.each(function(){function i(e){var i=e?-1:1;return c.isAnimating?!1:(c.isAnimating=!0,void t.navigate(i,s,o,n,c))}e&&$.extend(n,e);var s=$(this),o=s.find("ul"),r=o.children(".ref"),c={};c.itemW=r.width(),c.totalItems=r.length,c.totalItems>3&&s.prepend('<button id="prev" class="navSliderRef">‹</button>'),s.append('<button id="next" class="navSliderRef">›</button>'),n.scroll<1?n.scroll=1:n.scroll>3&&(n.scroll=3);var a=s.find("#prev"),l=s.find("#next");r.each(function(t){$(this).css({position:"absolute",left:t*c.itemW+"px"})}),a.bind("click.contentcarousel",function(t){i(!0)}),l.bind("click.contentcarousel",function(t){i(!1)}),$("html").hasClass("lt-ie9")||(o.on("swiperight",function(t){i(!0)}),o.on("swipeleft",function(t){i(!1)}))})}}};$.fn.contentcarousel=function(t){return e[t]?e[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void $.error("Method "+t+" does not exist on jQuery.contentcarousel"):e.init.apply(this,arguments)}}(jQuery);