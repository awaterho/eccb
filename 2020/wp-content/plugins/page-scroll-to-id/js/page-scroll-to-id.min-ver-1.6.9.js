/* Page scroll to id - version 1.6.9 */
!function(y,O,c,e){var n,b,s,a,l,i,o,r,h,u,t,d,f="mPageScroll2id",I="mPS2id",g={scrollSpeed:1e3,autoScrollSpeed:!0,scrollEasing:"easeInOutQuint",scrollingEasing:"easeOutQuint",pageEndSmoothScroll:!0,layout:"vertical",offset:0,highlightSelector:!1,clickedClass:I+"-clicked",targetClass:I+"-target",highlightClass:I+"-highlight",forceSingleHighlight:!1,keepHighlightUntilNext:!1,highlightByNextTarget:!1,disablePluginBelow:!1,clickEvents:!0,appendHash:!1,onStart:function(){},onComplete:function(){},defaultSelector:!1,live:!0,liveSelector:!1,excludeSelectors:!1,encodeLinks:!1},p=0,_={init:function(e){e=y.extend(!0,{},g,e);if(y(c).data(I,e),b=y(c).data(I),!this.selector){var t="__"+I;this.each(function(){var e=y(this);e.hasClass(t)||e.addClass(t)}),this.selector="."+t}b.liveSelector&&(this.selector+=","+b.liveSelector),n=n?n+","+this.selector:this.selector,b.defaultSelector&&("object"==typeof y(n)&&0!==y(n).length||(n=".m_PageScroll2id,a[rel~='m_PageScroll2id'],.page-scroll-to-id,a[rel~='page-scroll-to-id'],._ps2id")),b.clickEvents&&y(c).undelegate("."+I).delegate(n,"click."+I,function(e){if(w._isDisabled.call(null))w._removeClasses.call(null);else{var t=y(this),n=t.attr("href"),s=t.prop("href").baseVal||t.prop("href");b.excludeSelectors&&t.is(b.excludeSelectors)||n&&-1!==n.indexOf("#/")||(w._reset.call(null),u=t.data("ps2id-offset")||0,w._isValid.call(null,n,s)&&w._findTarget.call(null,n)&&(e.preventDefault(),a="selector",l=t,w._setClasses.call(null,!0),w._scrollTo.call(null)))}}),y(O).unbind("."+I).bind("scroll."+I+" resize."+I,function(){if(w._isDisabled.call(null))w._removeClasses.call(null);else{var a=y("._"+I+"-t");a.each(function(e){var t=y(this),n=t.attr("id"),s=w._findHighlight.call(null,n);w._setClasses.call(null,!1,t,s),e==a.length-1&&w._extendClasses.call(null)})}}),s=!0,w._setup.call(null),w._live.call(null)},scrollTo:function(e,t){if(w._isDisabled.call(null))w._removeClasses.call(null);else if(e&&void 0!==e){w._isInit.call(null);var n={layout:b.layout,offset:b.offset,clicked:!1};t=y.extend(!0,{},n,t);w._reset.call(null),r=t.layout,h=t.offset,e=-1!==e.indexOf("#")?e:"#"+e,w._isValid.call(null,e)&&w._findTarget.call(null,e)&&(a="scrollTo",(l=t.clicked)&&w._setClasses.call(null,!0),w._scrollTo.call(null))}},destroy:function(){y(O).unbind("."+I),y(c).undelegate("."+I).removeData(I),y("._"+I+"-t").removeData(I),w._removeClasses.call(null,!0)}},w={_isDisabled:function(){var e=O,t="inner",n=b.disablePluginBelow instanceof Array?[b.disablePluginBelow[0]||0,b.disablePluginBelow[1]||0]:[b.disablePluginBelow||0,0];return"innerWidth"in O||(t="client",e=c.documentElement||c.body),e[t+"Width"]<=n[0]||e[t+"Height"]<=n[1]},_isValid:function(e,t){if(e){var n=-1!==(t=t||e).indexOf("#/")?t.split("#/")[0]:t.split("#")[0],s=(O.location!==O.parent.location?O.parent.location:O.location).toString().split("#")[0];return"#"!==e&&-1!==e.indexOf("#")&&(""===n||decodeURIComponent(n)===decodeURIComponent(s))}},_setup:function(){var l=w._highlightSelector(),o=1,r=0;return y(l).each(function(){var e=y(this),t=e.attr("href"),n=e.prop("href").baseVal||e.prop("href");if(w._isValid.call(null,t,n)){if(b.excludeSelectors&&e.is(b.excludeSelectors))return;var s=-1!==t.indexOf("#/")?t.split("#/")[1]:t.split("#")[1],a=-1!==s.indexOf("%")?y(c.getElementById(s)):y("#"+s);if(0<a.length){b.highlightByNextTarget&&a!==r&&(r?r.data(I,{tn:a}):a.data(I,{tn:"0"}),r=a),a.hasClass("_"+I+"-t")||a.addClass("_"+I+"-t"),a.data(I,{i:o}),e.hasClass("_"+I+"-h")||e.addClass("_"+I+"-h");var i=w._findHighlight.call(null,s);w._setClasses.call(null,!1,a,i),p=o,++o==y(l).length&&w._extendClasses.call(null)}}})},_highlightSelector:function(){return b.highlightSelector&&""!==b.highlightSelector?b.highlightSelector:n},_findTarget:function(e){var t=-1!==e.indexOf("#/")?e.split("#/")[1]:e.split("#")[1],n=-1!==t.indexOf("%")?y(c.getElementById(t)):y("#"+t);if(n.length<1||"fixed"===n.css("position")){if("top"!==t)return;n=y("body")}return i=n,r||(r=b.layout),h=w._setOffset.call(null),(o=[(n.offset().top-h[0]).toString(),(n.offset().left-h[1]).toString()])[0]=o[0]<0?0:o[0],o[1]=o[1]<0?0:o[1],o},_setOffset:function(){var e,t,n,s;switch(h||(h=b.offset?b.offset:0),u&&(h=u),typeof h){case"object":case"string":0<(t=[(e=[h.y?h.y:h,h.x?h.x:h])[0]instanceof jQuery?e[0]:y(e[0]),e[1]instanceof jQuery?e[1]:y(e[1])])[0].length?(n=t[0].height(),"fixed"===t[0].css("position")&&(n+=t[0][0].offsetTop)):n=!isNaN(parseFloat(e[0]))&&isFinite(e[0])?parseInt(e[0]):0,0<t[1].length?(s=t[1].width(),"fixed"===t[1].css("position")&&(s+=t[1][0].offsetLeft)):s=!isNaN(parseFloat(e[1]))&&isFinite(e[1])?parseInt(e[1]):0;break;case"function":(e=h.call(null))instanceof Array?(n=e[0],s=e[1]):n=s=e;break;default:n=s=parseInt(h)}return[n,s]},_findHighlight:function(e){var t=O.location!==O.parent.location?O.parent.location:O.location,n=t.toString().split("#")[0],s=t.pathname;if(-1!==n.indexOf("'")&&(n=n.replace("'","\\'")),-1!==s.indexOf("'")&&(s=s.replace("'","\\'")),n=decodeURIComponent(n),s=decodeURIComponent(s),b.encodeLinks){var a=encodeURI(n).toLowerCase(),i=encodeURI(s).toLowerCase();return y("._"+I+"-h[href='#"+e+"'],._"+I+"-h[href='"+n+"#"+e+"'],._"+I+"-h[href='"+s+"#"+e+"'],._"+I+"-h[href='#/"+e+"'],._"+I+"-h[href='"+n+"#/"+e+"'],._"+I+"-h[href='"+s+"#/"+e+"'],._"+I+"-h[href='"+a+"#/"+e+"'],._"+I+"-h[href='"+a+"#"+e+"'],._"+I+"-h[href='"+i+"#/"+e+"'],._"+I+"-h[href='"+i+"#"+e+"']")}return y("._"+I+"-h[href='#"+e+"'],._"+I+"-h[href='"+n+"#"+e+"'],._"+I+"-h[href='"+s+"#"+e+"'],._"+I+"-h[href='#/"+e+"'],._"+I+"-h[href='"+n+"#/"+e+"'],._"+I+"-h[href='"+s+"#/"+e+"']")},_setClasses:function(e,t,n){var s=b.clickedClass,a=b.targetClass,i=b.highlightClass;e&&s&&""!==s?(y("."+s).removeClass(s),l.addClass(s)):t&&a&&""!==a&&n&&i&&""!==i&&(w._currentTarget.call(null,t)?(t.addClass(a),n.addClass(i)):(!b.keepHighlightUntilNext||1<y("."+i).length)&&(t.removeClass(a),n.removeClass(i)))},_extendClasses:function(){var e=b.targetClass,t=b.highlightClass,n=y("."+e),s=y("."+t),a=e+"-first",i=e+"-last",l=t+"-first",o=t+"-last";y("._"+I+"-t").removeClass(a+" "+i),y("._"+I+"-h").removeClass(l+" "+o),b.forceSingleHighlight?b.keepHighlightUntilNext&&1<n.length?(n.slice(0,1).removeClass(e),s.slice(0,1).removeClass(t)):(n.slice(1).removeClass(e),s.slice(1).removeClass(t)):(n.slice(0,1).addClass(a).end().slice(-1).addClass(i),s.slice(0,1).addClass(l).end().slice(-1).addClass(o))},_removeClasses:function(e){y("."+b.clickedClass).removeClass(b.clickedClass),y("."+b.targetClass).removeClass(b.targetClass+" "+b.targetClass+"-first "+b.targetClass+"-last"),y("."+b.highlightClass).removeClass(b.highlightClass+" "+b.highlightClass+"-first "+b.highlightClass+"-last"),e&&(y("._"+I+"-t").removeClass("_"+I+"-t"),y("._"+I+"-h").removeClass("_"+I+"-h"))},_currentTarget:function(e){if(e.data(I)){var t=b["target_"+e.data(I).i],n=e.data("ps2id-target"),s=n&&y(n)[0]?y(n)[0].getBoundingClientRect():e[0].getBoundingClientRect();if(void 0!==t){var a=e.offset().top,i=e.offset().left,l=t.from?t.from+a:a,o=t.to?t.to+a:a,r=t.fromX?t.fromX+i:i,c=t.toX?t.toX+i:i;return s.top>=o&&s.top<=l&&s.left>=c&&s.left<=r}var h=y(O).height(),u=y(O).width(),d=n?y(n).height():e.height(),f=n?y(n).width():e.width(),g=1+d/h,p=g,_=d<h?g*(h/d):g,w=1+f/u,m=w,S=f<u?w*(u/f):w,v=[s.top<=h/p,s.bottom>=h/_,s.left<=u/m,s.right>=u/S];if(b.highlightByNextTarget){var C=e.data(I).tn;if(C){var x=C[0].getBoundingClientRect();"vertical"===b.layout?v=[s.top<=h/2,x.top>h/2,1,1]:"horizontal"===b.layout&&(v=[1,1,s.left<=u/2,x.left>u/2])}}return v[0]&&v[1]&&v[2]&&v[3]}},_scrollTo:function(){d=w._scrollSpeed.call(null),o=b.pageEndSmoothScroll?w._pageEndSmoothScroll.call(null):o;var e=y("html,body"),t=b.autoScrollSpeed?w._autoScrollSpeed.call(null):d,n=e.is(":animated")?b.scrollingEasing:b.scrollEasing,s=y(O).scrollTop(),a=y(O).scrollLeft();switch(r){case"horizontal":a!=o[1]&&(w._callbacks.call(null,"onStart"),e.stop().animate({scrollLeft:o[1]},t,n).promise().then(function(){w._callbacks.call(null,"onComplete")}));break;case"auto":var i;if(s!=o[0]||a!=o[1])if(w._callbacks.call(null,"onStart"),navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/))e.stop().animate({pageYOffset:o[0],pageXOffset:o[1]},{duration:t,easing:n,step:function(e,t){"pageXOffset"==t.prop?i=e:"pageYOffset"==t.prop&&O.scrollTo(i,e)}}).promise().then(function(){w._callbacks.call(null,"onComplete")});else e.stop().animate({scrollTop:o[0],scrollLeft:o[1]},t,n).promise().then(function(){w._callbacks.call(null,"onComplete")});break;default:s!=o[0]&&(w._callbacks.call(null,"onStart"),e.stop().animate({scrollTop:o[0]},t,n).promise().then(function(){w._callbacks.call(null,"onComplete")}))}},_pageEndSmoothScroll:function(){var e=y(c).height(),t=y(c).width(),n=y(O).height(),s=y(O).width();return[e-o[0]<n?e-n:o[0],t-o[1]<s?t-s:o[1]]},_scrollSpeed:function(){var s=b.scrollSpeed;return l&&l.length&&l.add(l.parent()).each(function(){var e=y(this);if(e.attr("class")){var t=e.attr("class").split(" ");for(var n in t)if(String(t[n]).match(/^ps2id-speed-\d+$/)){s=t[n].split("ps2id-speed-")[1];break}}}),parseInt(s)},_autoScrollSpeed:function(){var e=y(O).scrollTop(),t=y(O).scrollLeft(),n=y(c).height(),s=y(c).width(),a=[d+d*Math.floor(Math.abs(o[0]-e)/n*100)/100,d+d*Math.floor(Math.abs(o[1]-t)/s*100)/100];return Math.max.apply(Math,a)},_callbacks:function(e){if(b)switch(this[I]={trigger:a,clicked:l,target:i,scrollTo:{y:o[0],x:o[1]}},e){case"onStart":if(b.appendHash&&O.history&&O.history.pushState&&l&&l.length){var t="#"+l.attr("href").split("#")[1];t!==O.location.hash&&history.pushState("","",t)}b.onStart.call(null,this[I]);break;case"onComplete":b.onComplete.call(null,this[I])}},_reset:function(){r=h=u=!1},_isInit:function(){s||_.init.apply(this)},_live:function(){t=setTimeout(function(){b.live?y(w._highlightSelector()).length!==p&&w._setup.call(null):t&&clearTimeout(t),w._live.call(null)},1e3)},_easing:function(){function t(e){var t=7.5625,n=2.75;return e<1/n?t*e*e:e<2/n?t*(e-=1.5/n)*e+.75:e<2.5/n?t*(e-=2.25/n)*e+.9375:t*(e-=2.625/n)*e+.984375}y.easing.easeInQuad=y.easing.easeInQuad||function(e){return e*e},y.easing.easeOutQuad=y.easing.easeOutQuad||function(e){return 1-(1-e)*(1-e)},y.easing.easeInOutQuad=y.easing.easeInOutQuad||function(e){return e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2},y.easing.easeInCubic=y.easing.easeInCubic||function(e){return e*e*e},y.easing.easeOutCubic=y.easing.easeOutCubic||function(e){return 1-Math.pow(1-e,3)},y.easing.easeInOutCubic=y.easing.easeInOutCubic||function(e){return e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2},y.easing.easeInQuart=y.easing.easeInQuart||function(e){return e*e*e*e},y.easing.easeOutQuart=y.easing.easeOutQuart||function(e){return 1-Math.pow(1-e,4)},y.easing.easeInOutQuart=y.easing.easeInOutQuart||function(e){return e<.5?8*e*e*e*e:1-Math.pow(-2*e+2,4)/2},y.easing.easeInQuint=y.easing.easeInQuint||function(e){return e*e*e*e*e},y.easing.easeOutQuint=y.easing.easeOutQuint||function(e){return 1-Math.pow(1-e,5)},y.easing.easeInOutQuint=y.easing.easeInOutQuint||function(e){return e<.5?16*e*e*e*e*e:1-Math.pow(-2*e+2,5)/2},y.easing.easeInExpo=y.easing.easeInExpo||function(e){return 0===e?0:Math.pow(2,10*e-10)},y.easing.easeOutExpo=y.easing.easeOutExpo||function(e){return 1===e?1:1-Math.pow(2,-10*e)},y.easing.easeInOutExpo=y.easing.easeInOutExpo||function(e){return 0===e?0:1===e?1:e<.5?Math.pow(2,20*e-10)/2:(2-Math.pow(2,-20*e+10))/2},y.easing.easeInSine=y.easing.easeInSine||function(e){return 1-Math.cos(e*Math.PI/2)},y.easing.easeOutSine=y.easing.easeOutSine||function(e){return Math.sin(e*Math.PI/2)},y.easing.easeInOutSine=y.easing.easeInOutSine||function(e){return-(Math.cos(Math.PI*e)-1)/2},y.easing.easeInCirc=y.easing.easeInCirc||function(e){return 1-Math.sqrt(1-Math.pow(e,2))},y.easing.easeOutCirc=y.easing.easeOutCirc||function(e){return Math.sqrt(1-Math.pow(e-1,2))},y.easing.easeInOutCirc=y.easing.easeInOutCirc||function(e){return e<.5?(1-Math.sqrt(1-Math.pow(2*e,2)))/2:(Math.sqrt(1-Math.pow(-2*e+2,2))+1)/2},y.easing.easeInElastic=y.easing.easeInElastic||function(e){return 0===e?0:1===e?1:-Math.pow(2,10*e-10)*Math.sin((10*e-10.75)*(2*Math.PI/3))},y.easing.easeOutElastic=y.easing.easeOutElastic||function(e){return 0===e?0:1===e?1:Math.pow(2,-10*e)*Math.sin((10*e-.75)*(2*Math.PI/3))+1},y.easing.easeInOutElastic=y.easing.easeInOutElastic||function(e){return 0===e?0:1===e?1:e<.5?-Math.pow(2,20*e-10)*Math.sin((20*e-11.125)*(2*Math.PI/4.5))/2:Math.pow(2,-20*e+10)*Math.sin((20*e-11.125)*(2*Math.PI/4.5))/2+1},y.easing.easeInBack=y.easing.easeInBack||function(e){return 2.70158*e*e*e-1.70158*e*e},y.easing.easeOutBack=y.easing.easeOutBack||function(e){return 1+2.70158*Math.pow(e-1,3)+1.70158*Math.pow(e-1,2)},y.easing.easeInOutBack=y.easing.easeInOutBack||function(e){return e<.5?Math.pow(2*e,2)*(7.189819*e-2.5949095)/2:(Math.pow(2*e-2,2)*(3.5949095*(2*e-2)+2.5949095)+2)/2},y.easing.easeInBounce=y.easing.easeInBounce||function(e){return 1-t(1-e)},y.easing.easeOutBounce=y.easing.easeOutBounce||t,y.easing.easeInOutBounce=y.easing.easeInOutBounce||function(e){return e<.5?(1-t(1-2*e))/2:(1+t(2*e-1))/2}}};w._easing.call(),y.fn[f]=function(e){return _[e]?_[e].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof e&&e?void y.error("Method "+e+" does not exist"):_.init.apply(this,arguments)},y[f]=function(e){return _[e]?_[e].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof e&&e?void y.error("Method "+e+" does not exist"):_.init.apply(this,arguments)},y[f].defaults=g}(jQuery,window,document),function(l){var o="mPS2id",r=mPS2id_params,c=r.shortcode_class,h=location.hash||null,u=function(e,t){try{l(e)}catch(e){return!1}return l(e).length&&(t||l("a[href*='"+e+"']").filter(function(){return 1==l(this).data(o+"Element")}).length)},d=function(e){if(-1===e.indexOf(","))return e;var t=e.split(",");return{y:t[0]||"0",x:t[1]||"0"}},f=function(e){if(-1===e.indexOf(","))return e;var t=e.split(",");return[t[0]||"0",t[1]||"0"]},g=function(e){"horizontal"!==e&&l(window).scrollTop(0),"vertical"!==e&&l(window).scrollLeft(0)},p=function(e,t){for(var n=e.click.length-1;0<=n;n--){var s=e.click[n];s&&"mPS2id"!=s.namespace&&("a[href*=#]"===s.selector?s.selector="a[href*=#]:not(._mPS2id-h)":'a[href*="#"]'===s.selector?s.selector='a[href*="#"]:not(._mPS2id-h)':"a[href*=#]:not([href=#])"===s.selector?s.selector="a[href*=#]:not([href=#]):not(._mPS2id-h)":'a[href*="#"]:not([href="#"])'===s.selector?s.selector='a[href*="#"]:not([href="#"]):not(._mPS2id-h)':s.selector&&-1!==s.selector.indexOf("mobmenu")?t.off("click"):t.off("click",s.handler))}},_="a[data-ps2id-api='true'][href*='#'],.ps2id > a[href*='#'],a.ps2id[href*='#']";l(function(){for(var e=0;e<r.total_instances;e++){var t=l("[class*='ps2id-id-']");if(t.length&&t.each(function(){var e,t=l(this),n=t.attr("class").split(" ");if(!t.attr("id"))for(var s in n)if(String(n[s]).match(/^ps2id-id-\S+$/)){e=n[s].split("ps2id-id-")[1],l("#"+e).length||t.attr("id",e);break}}),"true"===r.instances[o+"_instance_"+e].scrollToHash&&h&&(l(r.instances[o+"_instance_"+e].selector+",."+c+","+_).not(r.instances[o+"_instance_"+e].excludeSelector).each(function(){l(this).data(o+"Element",!0)}),u(h,"true"===r.instances[o+"_instance_"+e].scrollToHashForAll))){var n="true"===r.instances[o+"_instance_"+e].scrollToHashRemoveUrlHash?window.location.href.replace(/#.*$/,""):window.location.href.replace(/#.*$/,"#");g(r.instances[o+"_instance_"+e].layout),window.history&&window.history.replaceState?window.history.propertyIsEnumerable("","",n):window.location.href=n}}l("html").css("scroll-behavior","auto"),window.twentytwenty&&window.twentytwenty.smoothScroll&&(window.twentytwenty.smoothScroll=null)}),l(window).on("load",function(){for(var e=0;e<r.total_instances;e++){0<=r.instances[o+"_instance_"+e].selector.indexOf("a[href*=#]:not([href=#])")&&console.log("ps2id selector issue: a[href*=#]:not([href=#]) selector needs quotes"),0<=r.instances[o+"_instance_"+e].excludeSelector.indexOf("a[href*=#]:not([href=#])")&&console.log("ps2id excluded selector issue: a[href*=#]:not([href=#]) selector needs quotes");var n=l(r.instances[o+"_instance_"+e].selector+",."+c+","+_),t=r.instances[o+"_instance_"+e].autoCorrectScroll,s=0;if(window.ps2id_special_params&&(window.ps2id_special_params.highlightSelector&&(r.instances[o+"_instance_"+e].highlightSelector=window.ps2id_special_params.highlightSelector),window.ps2id_special_params.scrollSpeed&&(r.instances[o+"_instance_"+e].scrollSpeed=window.ps2id_special_params.scrollSpeed),window.ps2id_special_params.scrollEasing&&(r.instances[o+"_instance_"+e].scrollEasing=window.ps2id_special_params.scrollEasing),void 0!==window.ps2id_special_params.forceSingleHighlight&&(r.instances[o+"_instance_"+e].forceSingleHighlight=window.ps2id_special_params.forceSingleHighlight),void 0!==window.ps2id_special_params.keepHighlightUntilNext&&(r.instances[o+"_instance_"+e].keepHighlightUntilNext=window.ps2id_special_params.keepHighlightUntilNext),void 0!==window.ps2id_special_params.appendHash&&(r.instances[o+"_instance_"+e].appendHash=window.ps2id_special_params.appendHash),window.ps2id_special_params.layout&&(r.instances[o+"_instance_"+e].layout=window.ps2id_special_params.layout),window.ps2id_special_params.offset&&(r.instances[o+"_instance_"+e].offset=window.ps2id_special_params.offset)),n.mPageScroll2id({scrollSpeed:r.instances[o+"_instance_"+e].scrollSpeed,autoScrollSpeed:"true"===r.instances[o+"_instance_"+e].autoScrollSpeed,scrollEasing:r.instances[o+"_instance_"+e].scrollEasing,scrollingEasing:r.instances[o+"_instance_"+e].scrollingEasing,pageEndSmoothScroll:"true"===r.instances[o+"_instance_"+e].pageEndSmoothScroll,layout:r.instances[o+"_instance_"+e].layout,offset:d(r.instances[o+"_instance_"+e].offset.toString()),highlightSelector:r.instances[o+"_instance_"+e].highlightSelector,clickedClass:r.instances[o+"_instance_"+e].clickedClass,targetClass:r.instances[o+"_instance_"+e].targetClass,highlightClass:r.instances[o+"_instance_"+e].highlightClass,forceSingleHighlight:"true"===r.instances[o+"_instance_"+e].forceSingleHighlight,keepHighlightUntilNext:"true"===r.instances[o+"_instance_"+e].keepHighlightUntilNext,highlightByNextTarget:"true"===r.instances[o+"_instance_"+e].highlightByNextTarget,disablePluginBelow:f(r.instances[o+"_instance_"+e].disablePluginBelow.toString()),appendHash:"true"===r.instances[o+"_instance_"+e].appendHash,onStart:function(){"true"===t&&"selector"===mPS2id.trigger&&s++},onComplete:function(){1==s&&(mPS2id.clicked.length&&mPS2id.clicked.trigger("click.mPS2id"),s=0)},excludeSelectors:r.instances[o+"_instance_"+e].excludeSelector,encodeLinks:"true"===r.instances[o+"_instance_"+e].encodeLinks,liveSelector:r.instances[o+"_instance_"+e].selector+",."+c+","+_}),"true"===r.instances[o+"_instance_"+e].scrollToHash&&h&&u(h,"true"===r.instances[o+"_instance_"+e].scrollToHashForAll)){g(r.instances[o+"_instance_"+e].layout);var a=r.instances[o+"_instance_"+e].scrollToHashUseElementData,i=l("a._mPS2id-h[href$='"+h+"'][data-ps2id-offset]:not([data-ps2id-offset=''])").last();setTimeout(function(){"true"===a&&i.length?i.trigger("click.mPS2id"):l.mPageScroll2id("scrollTo",h),-1!==window.location.href.indexOf("#")&&(window.history&&window.history.replaceState?window.history.propertyIsEnumerable("","",h):window.location.hash=h)},r.instances[o+"_instance_"+e].scrollToHashDelay)}"true"===r.instances[o+"_instance_"+e].unbindUnrelatedClickEvents&&setTimeout(function(){var e=n.length?l._data(n[0],"events"):null,t=n.length?l._data(l(document)[0],"events"):null;e&&p(e,n),t&&p(t,n)},300),"true"===r.instances[o+"_instance_"+e].normalizeAnchorPointTargets&&l("a._mPS2id-t[id]:empty").css({display:"inline-block","line-height":0,width:0,height:0,border:"none"}),"true"===r.instances[o+"_instance_"+e].stopScrollOnUserAction&&l(document).on("mousewheel DOMMouseScroll touchmove",function(){var e=l("html,body");e.is(":animated")&&e.stop()})}}),l.extend(l.expr[":"],{absolute:l.expr[":"].absolute||function(e){return"absolute"===l(e).css("position")},relative:l.expr[":"].relative||function(e){return"relative"===l(e).css("position")},static:l.expr[":"].static||function(e){return"static"===l(e).css("position")},fixed:l.expr[":"].fixed||function(e){return"fixed"===l(e).css("position")},width:l.expr[":"].width||function(e,t,n){var s=n[3].replace("&lt;","<").replace("&gt;",">");return!!s&&(">"===s.substr(0,1)?l(e).width()>s.substr(1):"<"===s.substr(0,1)?l(e).width()<s.substr(1):l(e).width()===parseInt(s))},height:l.expr[":"].height||function(e,t,n){var s=n[3].replace("&lt;","<").replace("&gt;",">");return!!s&&(">"===s.substr(0,1)?l(e).height()>s.substr(1):"<"===s.substr(0,1)?l(e).height()<s.substr(1):l(e).height()===parseInt(s))}})}(jQuery);