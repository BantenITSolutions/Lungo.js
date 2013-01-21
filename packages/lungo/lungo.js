/* lungo v2.1.0 - 2013/1/21
   http://lungo.tapquo.com
   Copyright (c) 2013 Tapquo S.L. - Licensed GPLv3, Commercial */
var Lungo=Lungo||{};Lungo.VERSION="2.0",Lungo.Element||(Lungo.Element={}),Lungo.Data||(Lungo.Data={}),Lungo.Sugar||(Lungo.Sugar={}),Lungo.View||(Lungo.View={}),Lungo.Boot||(Lungo.Boot={}),Lungo.Device||(Lungo.Device={}),Lungo.ready||(Lungo.ready=Quo().ready),Lungo.Attributes={count:{selector:"*",html:'<span class="tag theme count">{{value}}</span>'},pull:{selector:"section",html:'<div class="{{value}}" data-control="pull" data-icon="down" data-loading="black">                    <strong>title</strong>                </div>'},progress:{selector:"*",html:'<div class="progress">                    <span class="bar"><span class="value" style="width:{{value}};"></span></span>                </div>'},label:{selector:"*",html:"<abbr>{{value}}</abbr>"},icon:{selector:"*",html:'<span class="icon {{value}}"></span>'},image:{selector:"*",html:'<img src="{{value}}" class="icon" />'},title:{selector:"header",html:'<span class="title centered">{{value}}</span>'},loading:{selector:"*",html:'<div class="loading {{value}}">                    <span class="top"></span>                    <span class="right"></span>                    <span class="bottom"></span>                    <span class="left"></span>                </div>'},back:{selector:"header",html:'<nav class="left"><a href="#back" data-router="section" class="left"><span class="icon {{value}}"></span></a></nav>'}},Lungo.Constants={ELEMENT:{SECTION:"section",ARTICLE:"article",ASIDE:"aside",BODY:"body",DIV:"div",LIST:"<ul></ul>",LI:"li"},QUERY:{LIST_IN_ELEMENT:"article.list, aside.list",ELEMENT_SCROLLABLE:"aside.scroll, article.scroll"},CLASS:{ACTIVE:"active",ASIDE:"aside",SHOW:"show",HIDE:"hide",HIDING:"hiding",RIGHT:"right",LEFT:"left",HORIZONTAL:"horizontal",SMALL:"small"},TRIGGER:{LOAD:"load",UNLOAD:"unload"},TRANSITION:{DURATION:350},ATTRIBUTE:{ID:"id",HREF:"href",TITLE:"title",ARTICLE:"article",CLASS:"class",WIDTH:"width",HEIGHT:"height",PIXEL:"px",PERCENT:"%",ROUTER:"router",FIRST:"first",LAST:"last",EMPTY:""},BINDING:{START:"{{",END:"}}",KEY:"value",SELECTOR:"{{value}}"},ERROR:{DATABASE:"ERROR: Connecting to Data.Sql.",DATABASE_TRANSACTION:"ERROR: Data.Sql >> ",ROUTER:"ERROR: The target does not exists >>",LOADING_RESOURCE:"ERROR: Loading resource: "}},Lungo.Core=function(e,t,n){var r=Array.prototype,i="#",s=function(t,n){e.Core.isMobile()||console[t===1?"log":t===2?"warn":"error"](n)},o=function(){var e=c(arguments),t=e.shift();l(t)==="function"&&t.apply(null,e)},u=function(e,t){return function(){return t.apply(e,c(arguments))}},a=function(){var e=e||{};for(var t=0,n=arguments.length;t<n;t++){var r=arguments[t];for(var i in r)f(r,i)&&(e[i]=r[i])}return e},f=function(e,n){return t.isOwnProperty(e,n)},l=function(e){return t.toType(e)},c=function(e){return r.slice.call(e,0)},h=function(){return t.isMobile()},p=function(){return t.environment()},d=function(e,t,n){var r=n==="desc"?-1:1;return e.sort(function(e,n){return e[t]<n[t]?-r:e[t]>n[t]?r:0})},v=function(e){var t=e.lastIndexOf(i);return t>0?e=e.substring(t):t===-1&&(e=i+e),e},m=function(e,t,n){var r=null;for(var i=0,s=e.length;i<s;i++){var o=e[i];if(o[t]==n){r=o;break}}return r};return{log:s,execute:o,bind:u,mix:a,isOwnProperty:f,toType:l,toArray:c,isMobile:h,environment:p,orderByProperty:d,parseUrl:v,findByProperty:m}}(Lungo,Quo),Lungo.dom=function(e){return $$(e)},Lungo.Events=function(e,t){var n=" ",r=function(t){for(event in t){var r=event.indexOf(n);if(r>0){var i=event.substring(0,r),s=event.substring(r+1);e.dom(s).on(i,t[event])}}};return{init:r}}(Lungo),Lungo.Fallback=function(e,t){var n=function(){env=e.Core.environment(),env.isMobile&&env.os.name==="Android"&&env.os.version<"3"?e.dom(document.body).data("position","absolute"):e.dom(document.body).data("position","fixed")};return{fixPositionInAndroid:n}}(Lungo),Lungo.init=function(e){e&&e.resources&&Lungo.Resource.load(e.resources),Lungo.Boot.Events.init(),Lungo.Boot.Data.init(),Lungo.Boot.Layout.init()},Lungo.Notification=function(e,t){var n=[],r=null,i=null,s=1,o=200,u=e.Constants.ATTRIBUTE,a=e.Constants.BINDING,f={BODY:"body",NOTIFICATION:".notification",MODAL:".notification .window",MODAL_HREF:".notification .window a",WINDOW_CLOSABLE:".notification [data-action=close], .notification > .error, .notification > .success",CONFIRM_BUTTONS:".notification .confirm a.button"},l={MODAL:"modal",VISIBLE:"visible",SHOW:"show",WORKING:"working",INPUT:"input"},c="Lungo.Notification.hide()",h='<div class="notification"><div class="window"></div></div>',p=function(n,r,i,s){var o;if(n!==t)o=x(n,null,r);else{var u=e.Attributes.loading.html;o=u.replace(a.START+a.KEY+a.END,"icon white")}E(o,"growl"),S(i,s)},d=function(){i.removeClass("show"),setTimeout(function(){r.style("display","none").removeClass("html").removeClass("confirm").removeClass("notify").removeClass("growl")},o-50)},v=function(e){n=e;var t=x(e.title,e.description,e.icon);t+=T(e.accept,"accept"),t+=T(e.cancel,"cancel"),E(t,"confirm")},m=function(e,t,n,r,i){y(e,t,n,"success",r,i)},g=function(e,t,n,r,i){y(e,t,n,"error",r,i)},y=function(e,t,n,r,i,s){E(x(e,t,n),r),i&&S(i,s)},b=function(e,t){e+=t?'<a href="#" class="button large anchor" data-action="close">'+t+"</a>":"",E(e,"html")},w=function(){e.dom(f.BODY).append(h),r=e.dom(f.NOTIFICATION),i=r.children(".window"),N()},E=function(e,t){r.show(),i.removeClass(l.SHOW),i.removeClass("error").removeClass("success").removeClass("html").removeClass("growl"),i.addClass(t),i.html(e),setTimeout(function(){i.addClass(l.SHOW)},s)},S=function(e,n){if(e!==t&&e!==0){var r=e*1e3;setTimeout(function(){d(),n&&setTimeout(n,o)},r)}},x=function(e,t,n){return t=t?t:"&nbsp;",'<span class="icon '+n+'"></span><strong class="text bold">'+e+"</strong><small>"+t+"</small>"},T=function(e,t){return'<a href="#" data-callback="'+t+'" class="button anchor large text thin">'+e.label+"</a>"},N=function(){e.dom(f.CONFIRM_BUTTONS).tap(function(t){var r=e.dom(this),i=n[r.data("callback")].callback;i&&i.call(i),d()}),e.dom(f.WINDOW_CLOSABLE).tap(d)};return w(),{show:p,hide:d,error:g,success:m,confirm:v,html:b}}(Lungo),Lungo.Resource=function(e,t,n){var r=e.Constants.ELEMENT,i=e.Constants.ERROR,s=function(t){if(e.Core.toType(t)==="array")for(var n=0,r=t.length;n<r;n++)o(t[n]);else o(t)},o=function(t){try{var n=u(t);a(n)}catch(r){e.Core.log(3,r.message)}},u=function(e){return t.ajax({url:e,async:!1,dataType:"html",error:function(){console.error(i.LOADING_RESOURCE+e)}})},a=function(t){e.Core.toType(t)==="string"&&e.dom(r.BODY).append(t)};return{load:s}}(Lungo,Quo),function(e,t){var n=e.document,r=n.documentElement,i="scroll-enabled",s="ontouchmove"in n,o="WebkitOverflowScrolling"in r.style||!s&&e.screen.width>1200||function(){var t=e.navigator.userAgent,n=t.match(/AppleWebKit\/([0-9]+)/),r=n&&n[1],i=n&&r>=534;return t.match(/Android ([0-9]+)/)&&RegExp.$1>=3&&i||t.match(/ Version\/([0-9]+)/)&&RegExp.$1>=0&&e.blackberry&&i||t.indexOf(/PlayBook/)>-1&&RegExp.$1>=0&&i||t.match(/Fennec\/([0-9]+)/)&&RegExp.$1>=4||t.match(/wOSBrowser\/([0-9]+)/)&&RegExp.$1>=233&&i||t.match(/NokiaBrowser\/([0-9\.]+)/)&&parseFloat(RegExp.$1)===7.3&&n&&r>=533}(),u=function(e,t,n,r){return n*((e=e/r-1)*e*e+1)+t},a=!1,f,l=function(n,r){var i=0,s=n.scrollLeft,o=n.scrollTop,u={top:"+0",left:"+0",duration:100,easing:e.overthrow.easing},a,l;if(r)for(var c in u)r[c]!==t&&(u[c]=r[c]);return typeof u.left=="string"?(u.left=parseFloat(u.left),a=u.left+s):(a=u.left,u.left=u.left-s),typeof u.top=="string"?(u.top=parseFloat(u.top),l=u.top+o):(l=u.top,u.top=u.top-o),f=setInterval(function(){i++<u.duration?(n.scrollLeft=u.easing(i,s,u.left,u.duration),n.scrollTop=u.easing(i,o,u.top,u.duration)):(a!==n.scrollLeft&&(n.scrollLeft=a),l!==n.scrollTop&&(n.scrollTop=l),h())},1),{top:l,left:a,duration:u.duration,easing:u.easing}},c=function(e,t){return!t&&e.className&&e.className.indexOf("scroll")>-1&&e||c(e.parentNode)},h=function(){clearInterval(f)},p=function(){if(a)return;a=!0;if(o||s)r.className+=" "+i;e.overthrow.forget=function(){r.className=r.className.replace(i,""),n.removeEventListener&&n.removeEventListener("touchstart",T,!1),e.overthrow.easing=u,a=!1};if(o||!s)return;var f,p=[],d=[],v,m,g=function(){p=[],v=null},y=function(){d=[],m=null},b=function(){var e=(p[0]-p[p.length-1])*8,t=(d[0]-d[d.length-1])*8,n=Math.max(Math.abs(t),Math.abs(e))/8;e=(e>0?"+":"")+e,t=(t>0?"+":"")+t,!isNaN(n)&&n>0&&(Math.abs(t)>80||Math.abs(e)>80)&&l(f,{left:t,top:e,duration:n})},E,S=function(e){E=f.querySelectorAll("textarea, input");for(var t=0,n=E.length;t<n;t++)E[t].style.pointerEvents=e},x=function(e,r){if(n.createEvent){var i=(!r||r===t)&&f.parentNode||f.touchchild||f,s;i!==f&&(s=n.createEvent("HTMLEvents"),s.initEvent("touchend",!0,!0),f.dispatchEvent(s),i.touchchild=f,f=i,i.dispatchEvent(e))}},T=function(e){h(),g(),y(),f=c(e.target);if(!f||f===r||e.touches.length>1)return;S("none");var t=e,n=f.scrollTop,i=f.scrollLeft,s=f.offsetHeight,o=f.offsetWidth,u=e.touches[0].pageY,a=e.touches[0].pageX,l=f.scrollHeight,w=f.scrollWidth,E=function(e){var r=n+u-e.touches[0].pageY,c=i+a-e.touches[0].pageX,h=r>=(p.length?p[0]:0),b=c>=(d.length?d[0]:0);r>0&&r<l-s||c>0&&c<w-o?e.preventDefault():x(t),v&&h!==v&&g(),m&&b!==m&&y(),v=h,m=b,f.scrollTop=r,f.scrollLeft=c,p.unshift(r),d.unshift(c),p.length>3&&p.pop(),d.length>3&&d.pop()},T=function(e){b(),S("auto"),setTimeout(function(){S("none")},450),f.removeEventListener("touchmove",E,!1),f.removeEventListener("touchend",T,!1)};f.addEventListener("touchmove",E,!1),f.addEventListener("touchend",T,!1)};n.addEventListener("touchstart",T,!1)};e.overthrow={set:p,forget:function(){},easing:u,toss:l,intercept:h,closest:c,support:o?"native":s&&"polyfilled"||"none"},p()}(this),Lungo.Service=function(e,t,n){var r="lungojs_service_cache",i={MINUTE:"minute",HOUR:"hour",DAY:"day"},s=function(e,n,r,i){return t.get(e,n,r,i)},o=function(e,n,r,i){return t.post(e,n,r,i)},u=function(e,n,r){return t.json(e,n,r)},a=function(n,r,i,s,o){var u=n+t.serializeParameters(r);if(!f(u,i))return t.get(n,r,function(e){p(u,e),s.call(s,e)},o);var a=e.Data.Storage.persistent(u);if(a)return s.call(s,a)},f=function(t,n){var i=!1,s=e.Data.Storage.persistent(r);if(s){var o=l(s[t]);i=c(o,n)}return i},l=function(e){var t=(new Date).getTime(),n=(new Date(e)).getTime();return t-n},c=function(e,t){var n=t.split(" "),r=h(n[1],e);return r<n[0]?!0:!1},h=function(e,t){var n=t/1e3/60;return e.indexOf(i.HOUR)>=0?n/=60:e.indexOf(i.DAY)>=0&&(n=n/60/24),n},p=function(t,n){var i=e.Data.Storage.persistent(r)||{};i[t]=new Date,e.Data.Storage.persistent(r,i),e.Data.Storage.persistent(t,n)};return{get:s,post:o,json:u,cache:a,Settings:t.ajaxSettings}}(Lungo,Quo),Lungo.Boot.Data=function(e,t){var n=e.Constants.BINDING,r=function(t){var n=e.dom(t||document.body);n.length>0&&i(n)},i=function(t){for(var n in e.Attributes)e.Core.isOwnProperty(e.Attributes,n)&&s(t,n)},s=function(t,n){attribute=e.Attributes[n];var r=attribute.selector+"[data-"+n+"]";t.find(r).each(function(t,r){var i=e.dom(r);o(i,i.data(n),attribute.html)})},o=function(e,t,r){var i=r.replace(n.START+n.KEY+n.END,t);e.prepend(i)};return{init:r}}(Lungo),Lungo.Boot.Events=function(e,t){var n=e.Constants.ATTRIBUTE,r=e.Constants.CLASS,i=e.Constants.ELEMENT,s={HREF_ASIDE:"header a[href][data-router=aside]",HREF_TARGET:"a[href][data-router]",HREF_TARGET_FROM_ASIDE:"aside a[href][data-router]",INPUT_CHECKBOX:"input[type=range].checkbox"},o=function(){e.dom(s.HREF_ASIDE).each(function(){e.View.Aside.suscribeEvents(this)}),e.dom(s.HREF_TARGET_FROM_ASIDE).tap(a),e.dom(s.HREF_TARGET).tap(u)},u=function(t){t.preventDefault();var n=e.dom(this);n.data("async")?c(n):l(n)},a=function(t){t.preventDefault(),e.View.Aside.hide()},f=function(t){t.preventDefault();var n=e.dom(this),r=n.val()>0?0:1;n.toggleClass("active").attr("value",r)},l=function(e){var t=e.data(n.ROUTER);switch(t){case i.SECTION:var r=e.attr(n.HREF);h(r);break;case i.ARTICLE:p(e);break;case i.ASIDE:d(e)}},c=function(t){e.Notification.show(),e.Resource.load(t.data("async")),t[0].removeAttribute("data-async"),e.Boot.Data.init(t.attr(n.HREF)),setTimeout(function(){l(t),e.Notification.hide()},e.Constants.TRANSITION.DURATION*2)},h=function(t){t=e.Core.parseUrl(t),t==="#back"?e.Router.back():e.Router.section(t)},p=function(t){var r=e.Router.History.current(),i=t.attr(n.HREF);e.Router.article(r,i,t)},d=function(t){var r=e.Router.History.current(),i=t.attr(n.HREF);e.Router.aside(r,i)};return{init:o}}(Lungo),Lungo.Boot.Layout=function(e,t){var n=e.Constants.ELEMENT,r=e.Constants.CLASS,i=e.Constants.ATTRIBUTE,s=e.Constants.QUERY,o=function(){e.Fallback.fixPositionInAndroid(),u(),a(s.LIST_IN_ELEMENT,f),a(s.ELEMENT_SCROLLABLE,l)},u=function(){var t=e.dom(n.SECTION).first().addClass(r.SHOW);e.Element.Cache.section=t,e.Element.Cache.article=t.children(n.ARTICLE+"."+r.ACTIVE),e.View.Article.switchReferenceItems(e.Element.Cache.article.attr("id"),t);var s="#"+t.attr(i.ID);e.Router.History.add(s)},a=function(t,n){var r=e.dom(t);for(var i=0,s=r.length;i<s;i++){var o=e.dom(r[i]);e.Core.execute(n,o)}},f=function(e){if(e.children().length===0){var t=e.attr(i.ID);e.append(n.LIST)}},l=function(e){e[0].addEventListener("touchstart",function(e){scrollTop=this.scrollTop,scrollTop<=1&&(this.scrollTop=1),scrollTop+this.offsetHeight>=this.scrollHeight&&(this.scrollTop=this.scrollHeight-this.offsetHeight-1)},!1)};return{init:o}}(Lungo),Lungo.Data.Cache=function(e,t){var n={},r=function(t,r){o(t)?n[t]=e.Core.mix(i(t),r):n[t]=r},i=function(e,r){return arguments.length===1?n[e]:n[arguments[0]]?n[arguments[0]][arguments[1]]:t},s=function(e,t){arguments.length===1?delete n[e]:delete n[arguments[0]][arguments[1]]},o=function(e){return n[e]?!0:!1};return{set:r,get:i,remove:s,exists:o}}(Lungo),Lungo.Data.Sql=function(e,t){var n=e.Constants.ERROR,r={name:"lungo_db",version:"1.0",size:65536,schema:[]},i=null,s=function(t){r=e.Core.mix(r,t),i=openDatabase(r.name,r.version,r.name,r.size);if(!i)throw new Error(n.DATABASE);c()},o=function(e,t,n){var r=t?" WHERE "+v(t,"AND"):"";l("SELECT * FROM "+e+r,function(e){var t=[];for(var r=0,i=e.rows.length;r<i;r++)t.push(e.rows.item(r));m(n,t)})},u=function(t,n,r){if(e.Core.toType(n)==="object")g(t,n);else for(row in n)g(t,n[row])},a=function(e,t,n,r){var i="UPDATE "+e+" SET "+v(t,",");n&&(i+=" WHERE "+v(n,"AND")),l(i)},f=function(e,t,n){var r=t?" WHERE "+v(t,"AND"):"";l("DELETE FROM "+e+r+";")},l=function(t,n){e.Core.log(1,"lng.Data.Sql >> "+t),i.transaction(function(e){e.executeSql(t,[],function(e,t){m(n,t)},function(e,n){e.executedQuery=t,y.apply(null,arguments)})})},c=function(){var e=r.schema,t=e.length;if(!t)return;for(var n=0;n<t;n++){var i=e[n];p(i),h(i.name,i.fields)}},h=function(t,n){var r="";for(var i in n)e.Core.isOwnProperty(n,i)&&(r&&(r+=", "),r+=i+" "+n[i]);l("CREATE TABLE IF NOT EXISTS "+t+" ("+r+");")},p=function(e){e.drop===!0&&d(e.name)},d=function(e){l("DROP TABLE IF EXISTS "+e)},v=function(t,n){var r="";for(var i in t)if(e.Core.isOwnProperty(t,i)){var s=t[i];r&&(r+=" "+n+" "),r+=i+"=",r+=isNaN(s)?'"'+s+'"':s}return r},m=function(t,n){e.Core.toType(t)==="function"&&setTimeout(t,100,n)},g=function(t,n){var r="",i="";for(var s in n)if(e.Core.isOwnProperty(n,s)){var o=n[s];r+=r?", "+s:s,i&&(i+=", "),i+=isNaN(o)||o==""?'"'+o+'"':o}l("INSERT INTO "+t+" ("+r+") VALUES ("+i+")")},y=function(e,t){throw new Error(n.DATABASE_TRANSACTION+t.code+": "+t.message+" \n Executed query: "+e.executedQuery)};return{init:s,select:o,insert:u,update:a,drop:f,execute:l}}(Lungo),Lungo.Data.Storage=function(e,t){var n={PERSISTENT:"localStorage",SESSION:"sessionStorage"},r=function(e,t){return s(n.PERSISTENT,e,t)},i=function(e,t){return s(n.SESSION,e,t)},s=function(e,t,n){var e=window[e];if(n)o(e,t,n);else{if(n!==null)return a(e,t);u(e,t)}},o=function(e,t,n){n=JSON.stringify(n),e.setItem(t,n)},u=function(e,t){e.removeItem(t)},a=function(e,t){return value=e.getItem(t),JSON.parse(value)};return{session:i,persistent:r}}(Lungo),Lungo.Element.Cache={section:null,article:null,aside:null,navigation:null},Lungo.Element.Carousel=function(e,t){var n={index:0,speed:300,callback:t,container:e,element:e.children[0],slide:undefined,slides:[],slides_length:0,width:0,start:{},isScrolling:undefined,deltaX:0},r=function(e){n.index&&a(n.index-1,n.speed)},i=function(e){n.index<n.slides_length-1?a(n.index+1,n.speed):a(0,n.speed)},s=function(){return n.index},o=function(){u()},u=function(){n.slides=n.element.children,n.slides_length=n.slides.length;if(n.slides_length<2)return null;n.width="getBoundingClientRect"in n.container?n.container.getBoundingClientRect().width:n.container.offsetWidth;if(!n.width)return null;n.element.style.width=n.slides.length*n.width+"px";var e=n.slides.length;while(e--){var t=n.slides[e];t.style.width=n.width+"px",t.style.display="table-cell",t.style.verticalAlign="top"}a(n.index,0),n.container.style.visibility="visible"},a=function(e,t){var r=n.element.style;t==undefined&&(t=n.speed),r.webkitTransitionDuration=r.MozTransitionDuration=r.msTransitionDuration=r.OTransitionDuration=r.transitionDuration=t+"ms",r.MozTransform=r.webkitTransform="translate3d("+ -(e*n.width)+"px,0,0)",r.msTransform=r.OTransform="translateX("+ -(e*n.width)+"px)",n.index=e},f=function(){n.element.addEventListener("touchstart",l,!1),n.element.addEventListener("touchmove",c,!1),n.element.addEventListener("touchend",h,!1),n.element.addEventListener("webkitTransitionEnd",p,!1),n.element.addEventListener("msTransitionEnd",p,!1),n.element.addEventListener("oTransitionEnd",p,!1),n.element.addEventListener("transitionend",p,!1),window.addEventListener("resize",u,!1)},l=function(e){n.start={pageX:e.touches[0].pageX,pageY:e.touches[0].pageY,time:Number(new Date)},n.isScrolling=undefined,n.deltaX=0,n.element.style.MozTransitionDuration=n.element.style.webkitTransitionDuration=0,e.stopPropagation()},c=function(e){if(e.touches.length>1||e.scale&&e.scale!==1)return;n.deltaX=e.touches[0].pageX-n.start.pageX,typeof n.isScrolling=="undefined"&&(n.isScrolling=!!(n.isScrolling||Math.abs(n.deltaX)<Math.abs(e.touches[0].pageY-n.start.pageY)));if(!n.isScrolling){e.preventDefault();var t=!n.index&&n.deltaX>0||n.index==n.slides_length-1&&n.deltaX<0?Math.abs(n.deltaX)/n.width+1:1;n.deltaX=n.deltaX/t;var r=n.deltaX-n.index*n.width;n.element.style.MozTransform=n.element.style.webkitTransform="translate3d("+r+"px,0,0)",e.stopPropagation()}},h=function(e){var t=Number(new Date)-n.start.time<250&&Math.abs(n.deltaX)>20||Math.abs(n.deltaX)>n.width/2,r=!n.index&&n.deltaX>0||n.index==n.slides_length-1&&n.deltaX<0;n.isScrolling||a(n.index+(t&&!r?n.deltaX<0?1:-1:0),n.speed),e.stopPropagation()},p=function(e){n.callback&&n.callback.apply(n.callback,[n.index,n.slides[n.index]])};return u(),f(),{prev:r,next:i,position:s,refresh:o}},Lungo.Element.Carousel=function(e,t){var n={gestureStarted:!1,index:0,speed:300,callback:t,container:e,element:e.children[0],slide:undefined,slides:[],slides_length:0,width:0,start:{},isScrolling:undefined,deltaX:0},r=function(e){n.index&&a(n.index-1,n.speed)},i=function(e){var t=n.index<n.slides_length-1?n.index+1:0;a(t,n.speed)},s=function(){return n.index},o=function(){u()},u=function(){n.slides=n.element.children,n.slides_length=n.slides.length;if(n.slides_length<2)return null;n.width="getBoundingClientRect"in n.container?n.container.getBoundingClientRect().width:n.container.offsetWidth;if(!n.width)return null;n.element.style.width=n.slides.length*n.width+"px";var e=n.slides.length;while(e--){var t=n.slides[e];t.style.width=n.width+"px",t.style.display="table-cell",t.style.verticalAlign="top"}a(n.index,0),n.container.style.visibility="visible"},a=function(e,t){var r=n.element.style;t==undefined&&(t=n.speed),r.webkitTransitionDuration=r.MozTransitionDuration=r.msTransitionDuration=r.OTransitionDuration=r.transitionDuration=t+"ms",r.MozTransform=r.webkitTransform="translate3d("+ -(e*n.width)+"px,0,0)",r.msTransform=r.OTransform="translateX("+ -(e*n.width)+"px)",n.index=e},f=function(){$$(n.element).swiping(function(e){n.gestureStarted?_moveGesture(e):_startGesture(e)}),$$(n.element).swipe(l),$$(n.element).on("webkitTransitionEnd",c,!1),$$(n.element).on("msTransitionEnd",c,!1),$$(n.element).on("oTransitionEnd",c,!1),$$(n.element).on("transitionend",c,!1),$$(window).on("resize",u,!1)};_startGesture=function(e){n.start={pageX:e.currentTouch.x,pageY:e.currentTouch.y,time:Number(new Date)},n.isScrolling=undefined,n.deltaX=0,n.element.style.MozTransitionDuration=n.element.style.webkitTransitionDuration=0,typeof e.stopPropagation=="function"&&e.stopPropagation(),n.gestureStarted=!0},_moveGesture=function(e){n.deltaX=e.currentTouch.x-n.start.pageX,typeof n.isScrolling=="undefined"&&(n.isScrolling=!!(n.isScrolling||Math.abs(n.deltaX)<Math.abs(e.currentTouch.y-n.start.pageY)));if(!n.isScrolling){e.preventDefault();var t=!n.index&&n.deltaX>0||n.index==n.slides_length-1&&n.deltaX<0?Math.abs(n.deltaX)/n.width+1:1;n.deltaX=n.deltaX/t;var r=n.deltaX-n.index*n.width;n.element.style.MozTransform=n.element.style.webkitTransform="translate3d("+r+"px,0,0)",typeof e.stopPropagation=="function"&&e.stopPropagation()}};var l=function(){if(n.gestureStarted){var e=Number(new Date)-n.start.time<250&&Math.abs(n.deltaX)>20||Math.abs(n.deltaX)>n.width/2,t=!n.index&&n.deltaX>0||n.index==n.slides_length-1&&n.deltaX<0;n.isScrolling||a(n.index+(e&&!t?n.deltaX<0?1:-1:0),n.speed),typeof event.stopPropagation=="function"&&event.stopPropagation(),n.gestureStarted=!1}},c=function(e){n.callback&&n.callback.apply(n.callback,[n.index,n.slides[n.index]])};return u(),f(),{prev:r,next:i,position:s,refresh:o}},Lungo.Element.count=function(e,t){var n=Lungo.dom(e);n.children(".bubble.count").remove();if(n&&t){var r=Lungo.Constants.BINDING.SELECTOR;html=Lungo.Attributes.count.html.replace(r,t),n.append(html)}},Lungo.Element.loading=function(e,t){var n=Lungo.dom(e);if(n){var r=null;if(t){var i=Lungo.Constants.BINDING.SELECTOR;r=Lungo.Attributes.loading.html.replace(i,t)}n.html(r)}},Lungo.Element.progress=function(e,t){var n=Lungo.dom(e);n&&(t+=Lungo.Constants.ATTRIBUTE.PERCENT,n.find(".value").style(Lungo.Constants.ATTRIBUTE.WIDTH,t))},Lungo.Element.Pull=function(e,t){var n=60,r=80,i=300,s=0,o=!1,u=$$(e),a=u.siblings('div[data-control="pull"]'),f,l={onPull:"Pull down to refresh",onRelease:"Release to...",onRefresh:"Loading...",callback:undefined};f=Lungo.Core.mix(l,t);var c=function(){h(0,!0),setTimeout(function(){o=!1,document.removeEventListener("touchmove",g,!1)},i),s=0},h=function(e,t){var n=e>r?r:e;t&&u.addClass("pull"),u.style("-webkit-transform","translate(0, "+n+"px)"),t&&setTimeout(function(){u.removeClass("pull")},i)},p=function(e){o=!0,document.addEventListener("touchmove",g,!1),d(f.onRefresh),v(!0),h(n,!0),f.callback&&f.callback.apply(this)},d=function(e){a.find("strong").html(e)},v=function(e){e?a.addClass("refresh"):a.removeClass("refresh")},m=function(e){e?a.addClass("rotate"):a.removeClass("rotate")},g=function(e){e.preventDefault()},y=function(e){h(s,!1),v(!1),s>n?(d(f.onRelease),m(!0)):(d(f.onPull),m(!1))},b=function(e){s>n?p():c()};return function(){var e=!1,t={};u.bind("touchstart",function(n){u[0].scrollTop<=1&&(e=!0,t=$$.isMobile()?n.touches[0].pageY:n.pageY)}).bind("touchmove",function(n){!o&&e&&(current_y=$$.isMobile()?n.touches[0].pageY:n.pageY,s=current_y-t,s>=0&&(u.style("overflow-y","hidden"),y()))}).bind("touchend",function(){e&&(u.style("overflow-y","scroll"),b()),INI_TOUCH={},e=!1})}(),{hide:c}},Lungo.Router=function(e,t){var n=e.Constants.CLASS,r=e.Constants.ELEMENT,i=e.Constants.ERROR,s=e.Constants.TRIGGER,o=e.Constants.ATTRIBUTE,u="#",a=function(t){t=e.Core.parseUrl(t);var i=e.Element.Cache.section;if(h(t,i)){var s=i.siblings(r.SECTION+t);s.length>0&&(target_transition=s.data("transition"),target_transition&&(m(i),v(i,target_transition)),i.removeClass(n.SHOW).addClass(n.HIDE),s.removeClass(n.HIDE).addClass(n.SHOW),e.Element.Cache.section=s,e.Element.Cache.article=s.find(r.ARTICLE+"."+n.ACTIVE),e.Router.History.add(t),d(i,s))}},f=function(t,i,u){i=e.Core.parseUrl(i);var f=e.Element.Cache.article;if(h(i,f)){a(t);var l=e.Element.Cache.section.find(r.ARTICLE+i);l.length>0&&(p(f)!==p(l)&&(f=e.Element.Cache.section.children(r.ARTICLE)),f.removeClass(n.ACTIVE).trigger(s.UNLOAD),l.addClass(n.ACTIVE).trigger(s.LOAD),e.Element.Cache.article=l,e.View.Article.switchNavItems(i),e.View.Article.switchReferenceItems(i,e.Element.Cache.section),u&&e.View.Article.title(u.data(o.TITLE)))}},l=function(t,n){n=e.Core.parseUrl(n),e.View.Aside.toggle(n)},c=function(){var t=e.Element.Cache.section;t.removeClass(n.SHOW).addClass(n.HIDING),setTimeout(function(){t.removeClass(n.HIDING)},e.Constants.TRANSITION.DURATION),e.Router.History.removeLast(),target=t.siblings(r.SECTION+e.Router.History.current()),v(target,target.data("transition-origin")),target.removeClass(n.HIDE).addClass(n.SHOW),e.Element.Cache.section=target,e.Element.Cache.article=target.find(r.ARTICLE+"."+n.ACTIVE),d(t,target)},h=function(e,t){return e!==u+t.attr("id")?!0:!1},p=function(e){return e.parent("section").attr("id")},d=function(e,t){e.trigger(s.UNLOAD),t.trigger(s.LOAD)},v=function(e,t){e.data("transition",t)},m=function(e){e.data("transition-origin",e.data("transition"))};return{section:a,article:f,aside:l,back:c}}(Lungo),Lungo.Router.History=function(e){var t=[],n=function(e){e!==r()&&t.push(e)},r=function(){return t[t.length-1]},i=function(){t.length-=1};return{add:n,current:r,removeLast:i}}(),Lungo.View.Article=function(e,t){var n=e.Constants.ELEMENT,r=e.Constants.CLASS,i=e.Constants.ATTRIBUTE,s={NAVIGATION_ITEM:'a[href][data-router="article"]',REFERENCE_LINK:" a[href][data-article]",TITLE_OF_ARTICLE:"header .title, footer .title",ASIDE_REFERENCE_LIST:"li a.active, li.active"},o=function(t){t&&e.Element.Cache.section.find(s.TITLE_OF_ARTICLE).text(t)},u=function(t){e.Element.Cache.section.find(s.NAVIGATION_ITEM).removeClass(r.ACTIVE);var n='a[href="'+t+'"][data-router="article"]';e.Element.Cache.section.find(n).addClass(r.ACTIVE),e.Element.Cache.aside&&(aside=e.Element.Cache.aside,aside.find(s.ASIDE_REFERENCE_LIST).removeClass(r.ACTIVE),aside.find(n).addClass(r.ACTIVE).parent().addClass(r.ACTIVE))},a=function(e,t){var n="[data-article="+e.replace("#","")+"]";t.find(s.REFERENCE_LINK).hide().siblings(n).show()};return{title:o,switchReferenceItems:a,switchNavItems:u}}(Lungo),Lungo.View.Aside=function(e,t){var n=e.Constants.ELEMENT,r=e.Constants.CLASS,i=e.Constants.ATTRIBUTE,s=parseInt(document.body.getBoundingClientRect().width/3,10),o=function(t){aside=l(t);if(aside){var n=aside.hasClass(r.SHOW);n?e.View.Aside.hide():e.View.Aside.show(aside)}aside=null},u=function(t){e.Core.toType(t)=="string"&&(t=l(e.Core.parseUrl(t)));if(t){e.Element.Cache.aside=t;var n=c(t);t.addClass(r.SHOW),e.Element.Cache.section.addClass(n).addClass(r.ASIDE)}t=null},a=function(t){var n=e.Element.Cache.aside||t;if(n){e.Element.Cache.section.removeClass(r.ASIDE).removeClass(r.RIGHT).removeClass(r.SMALL);var i=c(n);i&&e.Element.Cache.section.removeClass(i),setTimeout(function(){n.removeClass(r.SHOW),e.Element.Cache.aside=null},350)}},f=function(t){var n=!1,i=e.dom(t),o=i.closest("section"),f=e.dom(i.attr("href"));o.swiping(function(e){if(!o.hasClass("aside")){var t=e.currentTouch.x-e.iniTouch.x,i=Math.abs(e.currentTouch.y-e.iniTouch.y);n=n?!0:t>3*i&&t<50,n?(t=t>256?256:t<0?0:t,f.addClass(r.SHOW),o.vendor("transform","translateX("+t+"px)"),o.vendor("transition-duration","0s")):o.attr("style","")}}),o.swipe(function(e){var t=e.currentTouch.x-e.iniTouch.x,r=Math.abs(e.currentTouch.y-e.iniTouch.y);o.attr("style",""),t>s&&n?u(f):a(f),n=!1})},l=function(t){var r=null,i=e.dom(n.ASIDE);if(i.length==1){var s="#"+i[0].id;s==t&&(r=e.dom(i[0]))}else i.length>1&&(r=i.siblings(n.ASIDE+t));return r},c=function(e){var t=e.attr(i.CLASS),n="";return t&&(n+=t.indexOf(r.RIGHT)>-1?r.RIGHT+" ":"",n+=t.indexOf(r.SMALL)>-1?r.SMALL+" ":""),n};return{suscribeEvents:f,toggle:o,show:u,hide:a}}(Lungo);