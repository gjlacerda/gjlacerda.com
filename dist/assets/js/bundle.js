!function(e){function t(a){if(n[a])return n[a].exports;var i=n[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),o={NEXT:"next",PREV:"prev"},c=function(){function e(){a(this,e),this.$body=document.querySelector("body"),this.$main=document.querySelector("main"),this.$sections=document.querySelectorAll("section"),this.$mainContent=document.querySelector(".main-content"),this.$headerNavLi=document.querySelectorAll(".header-nav li"),this.$scrollArrow=document.querySelector(".scroll-arrow"),this.page="home",this.loadingPage=!1,this.pages={home:{next:"skills"},skills:{next:"about",prev:"home"},about:{prev:"skills"}},this.touchList=[],this.lastWheelTime=(new Date).getDate(),this.lastWheelTimeout=null,this.touchStart=null,this.touchEnd=null,this.registerEvent()}return i(e,[{key:"setMaxHeight",value:function(){var e=window.innerHeight+"px";this.$sections.forEach(function(t){t.style.height=e}),this.$main.style.height=e}},{key:"changePage",value:function(e){var t=this,n=Object.keys(this.pages).indexOf(e),a=-(window.innerHeight*n);return!this.loadingPage&&(this.loadingPage=!0,this.page=e,this.$mainContent.style.transform="translateY("+a+"px)",setTimeout(function(){t.loadingPage=!1},600),this.execCallbackPage(),this.activateItemNavbar(),void this.toggleScrollArrow())}},{key:"getPageOnScroll",value:function(e){var t=this,n=e.deltaY>0?o.NEXT:o.PREV,a=(new Date).getTime(),i=!1;e.preventDefault(),(a-this.lastWheelTime)/1e3<.1&&(i=!0),this.lastWheelTime=a,i||(this.lastWheelTimeout&&clearTimeout(this.lastWheelTimeout),this.lastWheelTimeout=setTimeout(function(){t.lastWheelTime=t.lastWheelTime-1e4},1500),e.preventDefault(),this.changePageByDirection(n))}},{key:"getPageOnTouch",value:function(e){if(this.touchList.push(e.touches[0].pageY),this.touchList.length>=10){var t=this.touchList[0],n=this.touchList[this.touchList.length-1],a=t>n?o.NEXT:o.PREV;this.resetTouch(),this.changePageByDirection(a)}}},{key:"activateItemNavbar",value:function(){var e=Object.keys(this.pages).indexOf(this.page);this.$headerNavLi.forEach(function(t,n){var a=e===n?"add":"remove";t.classList[a]("active")})}},{key:"execCallbackPage",value:function(){var e=this.pages[this.page].callback;e&&(e(),this.pages[this.page].callback=null)}},{key:"toggleScrollArrow",value:function(){var e=this.pages[this.page].next?"remove":"add";this.$scrollArrow.classList[e]("hide")}},{key:"nextPage",value:function(){var e=this.pages[this.page].next;e&&this.changePage(e)}},{key:"toggleMenu",value:function(){this.$body.classList.toggle("menu-active")}},{key:"changePageByDirection",value:function(e){var t=this.pages[this.page][e];t&&this.changePage(t)}},{key:"registerEvent",value:function(){var e=this;this.$body.addEventListener("mousewheel",function(){return e.getPageOnScroll(event)}),this.$body.addEventListener("touchstart",function(){return e.onTouchStart(event)}),this.$body.addEventListener("touchmove",function(){return e.onTouchMove(event)}),this.$body.addEventListener("touchend",function(){return e.onTouchEnd(event)})}},{key:"onTouchStart",value:function(e){this.touchStart=e.touches[0].pageY,this.touchEnd=void 0}},{key:"onTouchMove",value:function(e){this.touchEnd=e.touches[0].pageY}},{key:"onTouchEnd",value:function(){var e=Math.abs(this.touchStart-this.touchEnd),t=this.touchStart>this.touchEnd?o.NEXT:o.PREV;isNaN(e)||e<50||this.changePageByDirection(t)}}]),e}();t.default=c},function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),o=Math.PI/2,c=2*Math.PI,r=2,l=function(){function e(){a(this,e),this.configSize={},this.skills=[{canvas:document.getElementById("javascript"),label:document.querySelector(".javascript-label"),name:"javascript",percent:0,maxPercent:90,color:"189, 92, 185"},{canvas:document.getElementById("angular1"),label:document.querySelector(".angular1-label"),name:"angular1",percent:0,maxPercent:90,color:"45, 126, 165"},{canvas:document.getElementById("angular2"),label:document.querySelector(".angular2-label"),name:"angular2",percent:0,maxPercent:75,color:"254, 94, 65"},{canvas:document.getElementById("react"),label:document.querySelector(".react-label"),name:"react",percent:0,maxPercent:50,color:"46, 204, 113"},{canvas:document.getElementById("gulp"),label:document.querySelector(".gulp-label"),name:"gulp",percent:0,maxPercent:75,color:"192, 57, 43"},{canvas:document.getElementById("html5"),label:document.querySelector(".html5-label"),name:"html5",percent:0,maxPercent:95,color:"51, 139, 231"},{canvas:document.getElementById("css3"),label:document.querySelector(".css3-label"),name:"css3",percent:0,maxPercent:90,color:"254, 134, 31"},{canvas:document.getElementById("less"),label:document.querySelector(".less-label"),name:"less",percent:0,maxPercent:85,color:"52, 73, 94"},{canvas:document.getElementById("git"),label:document.querySelector(".git-label"),name:"git",percent:0,maxPercent:70,color:"142, 68, 173"},{canvas:document.getElementById("php"),label:document.querySelector(".php-label"),name:"php",percent:0,maxPercent:80,color:"26, 188, 156"}]}return i(e,[{key:"init",value:function(){this.getConfigurationSize(),this.configureElements()}},{key:"configureElements",value:function(){var e=this;this.skills.forEach(function(t){t.canvas.width=e.configSize.canvasWidth*r,t.canvas.height=e.configSize.canvasWidth*r,t.canvas.style.width=e.configSize.canvasWidth+"px",t.canvas.style.height=e.configSize.canvasWidth+"px",t.label.style.color="rgb("+t.color+")"})}},{key:"render",value:function(e){var t=e.canvas,n=t.getContext("2d"),a=e.percent/100,i=parseInt(e.maxPercent*a),l=e.maxPercent/100*c*a-o,s=t.width/2,u=t.height/2,h=t.width/2-this.configSize.lineWidth/2*r;n.lineWidth=this.configSize.lineWidth*r,n.font=this.configSize.font+"px Arial",n.clearRect(0,0,t.width,t.height),n.beginPath(),n.arc(s,u,h,-o,100),n.fillStyle="rgba("+e.color+",.1)",n.fill(),n.beginPath(),n.arc(s,u,h,-o,l),n.strokeStyle="rgb("+e.color+")",n.stroke(),n.fillStyle="#666",n.fillText(i+"%",t.width/2-this.configSize.textX,t.height/2+10)}},{key:"startAnimation",value:function(){var e=this;setTimeout(function(){e.skills.forEach(function(t,n){setTimeout(function(){e.animateElements(t.canvas),e.animateCanvas(t)},400*n)})},400)}},{key:"animateCanvas",value:function(e){var t=this;e.percent<100&&requestAnimationFrame(function(){return t.animateCanvas(e)}),this.render(e),e.percent+=1.5}},{key:"animateElements",value:function(e){e.parentNode.style.transform="scale(1)",e.parentNode.style.opacity=1}},{key:"getConfigurationSize",value:function(){var e=window.innerWidth;this.configSize={canvasWidth:65,lineWidth:3,font:12*r,textX:10*r},e>=375&&(this.configSize={canvasWidth:75,lineWidth:4,font:12*r,textX:10*r}),e>=450&&(this.configSize={canvasWidth:90,lineWidth:4,font:12*r,textX:10*r}),e>=600&&(this.configSize={canvasWidth:120,lineWidth:4,font:14*r,textX:10*r}),e>=1415&&(this.configSize={canvasWidth:180,lineWidth:5,font:16*r,textX:12*r})}}]),e}();t.default=l},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}var i=n(0),o=a(i),c=n(1),r=a(c),l=new o.default,s=new r.default;l.setMaxHeight(),l.pages.skills.callback=function(){return s.startAnimation()},window.addEventListener("resize",function(){l.setMaxHeight()}),s.init(),window.App=l}]);