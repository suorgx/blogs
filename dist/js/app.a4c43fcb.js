(function(){"use strict";var t={9002:function(t,e,s){var i=s(9242),n=s(3396),l=s(7139);const o={key:0,class:"page"},a={class:"attach bloggers"},h=(0,n._)("h2",{class:"bloggers_title"},"Наши топ-блогеры",-1),r=(0,n._)("p",{class:"bloggers_description"},[(0,n.Uk)("Лучше специалисты в своем деле, "),(0,n._)("br"),(0,n.Uk)(" средний опыт работы в профессии - 27 лет")],-1),c={class:"slider_case container"},d=["onClick"],m=["src"],u={class:"user_name"},v={class:"user_company"},g={class:"posts"},p={class:"container"},f={class:"posts_title"},w=(0,n.Uk)("3 актуальных поста "),k={class:"post_title"},_={class:"post_body"},y={key:1};function b(t,e,s,b,D,L){const A=(0,n.up)("v-slider");return D.isUsersLoading?((0,n.wg)(),(0,n.iD)("div",y,"Идет загрузка...")):((0,n.wg)(),(0,n.iD)("div",o,[(0,n._)("div",a,[h,r,(0,n._)("div",c,[(0,n.Wm)(A,(0,l.vs)((0,n.F4)(D.options)),{default:(0,n.w5)((()=>[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(D.users,(t=>((0,n.wg)(),(0,n.iD)("div",{class:"item user",key:t.id,onClick:e=>L.loadPostsAndChangeColor(t,e.target)},[(0,n._)("img",{class:"user_image",src:t.image},null,8,m),(0,n._)("div",u,(0,l.zw)(t.name),1),(0,n._)("div",v,(0,l.zw)(t.company.name),1)],8,d)))),128))])),_:1},16)])]),(0,n._)("div",g,[(0,n._)("div",p,[(0,n._)("h2",f,[w,(0,n._)("span",null,(0,l.zw)(D.nameUser),1)]),(0,n.Wm)(i.W3,{name:"animate"},{default:(0,n.w5)((()=>[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(D.posts,(t=>((0,n.wg)(),(0,n.iD)("div",{class:"post",key:t.id},[(0,n._)("div",k,(0,l.zw)(t.title),1),(0,n._)("div",_,(0,l.zw)(t.body),1)])))),128))])),_:1})])])]))}const D={class:"v_slider"},L=["innerHTML"],A=["innerHTML"],I={class:"v_slider__list",ref:"list"},M={key:2,class:"v_slider__dots"},S=["onClick"],E=(0,n._)("span",null,null,-1),N=[E];function x(t,e,s,i,o,a){return(0,n.wg)(),(0,n.iD)("div",D,[s.nav?((0,n.wg)(),(0,n.iD)("button",{key:0,class:"v_slider__prev",innerHTML:s.prevNav,onClick:e[0]||(e[0]=(...t)=>a.prevSlide&&a.prevSlide(...t))},null,8,L)):(0,n.kq)("",!0),s.nav?((0,n.wg)(),(0,n.iD)("button",{key:1,class:"v_slider__next",innerHTML:s.nextNav,onClick:e[1]||(e[1]=(...t)=>a.nextSlide&&a.nextSlide(...t))},null,8,A)):(0,n.kq)("",!0),(0,n._)("div",I,[(0,n._)("div",{class:"v_slider__track",ref:"track",style:(0,l.j5)({width:o.width.track+"px",transform:"translate(-"+o.transform+"px)",transition:"transform "+o.settings.timing+" "+o.settings.speed+"ms"})},[(0,n.WI)(t.$slots,"default")],4)],512),s.dots?((0,n.wg)(),(0,n.iD)("ul",M,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(o.numDot,(t=>((0,n.wg)(),(0,n.iD)("li",{onClick:e=>a.setDot(t),class:(0,l.C_)({active:t==o.numDotActive}),key:t},N,10,S)))),128))])):(0,n.kq)("",!0)])}var C={name:"slider",props:{items:{type:Number,default:3},margin:{type:Number,default:0},nav:{type:Boolean,default:!1},dots:{type:Boolean,default:!1},loop:{type:Boolean,default:!1},prevNav:{type:String,default:""},nextNav:{type:String,default:""},speed:{type:Number,default:300},timing:{type:String,default:"ease"},offset:{type:Number,default:1},sibling:{type:Boolean,default:!1},responsive:{type:Object,default:{}}},data(){return{el:{track:null,slides:null},width:{document:0,container:0,slide:0,track:0},itemActive:0,numItemReal:0,numItemAll:0,breakpoints:[],numDot:0,numDotActive:0,transform:0,settings:{items:this.items,margin:this.margin,nav:this.nav,dots:this.dots,loop:this.loop,prevNav:this.prevNav,nextNav:this.nextNav,speed:this.speed,timing:this.timing,offset:this.offset,responsive:this.responsive},mouseDown:!1,swipeDistance:50,dragDistance:0}},mounted(){this.$nextTick((function(){this.el.list=this.$refs.list,this.el.track=this.$refs.track,this.el.slides=this.el.track.children,this.numItemReal=this.el.slides.length;for(let t=0;t<this.numItemReal;++t)this.el.slides[t].classList.add("v_slider__item");if(this.settings.loop){let t=this.el.track.getElementsByClassName("v_slider__item");for(let e=0;e<this.numItemReal;++e){let s=t[e].cloneNode(!0);s.classList.add("cloned"),this.el.track.insertBefore(s,this.el.slides[this.numItemReal-1+e].nextSibling)}for(let e=this.numItemReal;e>0;--e){let e=t[this.numItemReal-1].cloneNode(!0);e.classList.add("cloned"),this.el.track.insertBefore(e,this.el.slides[0])}}this.settings.loop?this.numItemAll=3*this.numItemReal:this.numItemAll=this.numItemReal,window.addEventListener("resize",this.getWidthDocument),"ontouchstart"in window?(this.el.track.addEventListener("touchstart",this.handleMouseDown),this.el.track.addEventListener("touchend",this.handleMouseUp),this.el.track.addEventListener("touchmove",this.handleMouseMove)):(this.el.track.addEventListener("mousedown",this.handleMouseDown),this.el.track.addEventListener("mouseup",this.handleMouseUp),this.el.track.addEventListener("mousemove",this.handleMouseMove)),this.getWidthDocument()}))},beforeDestroy(){window.removeEventListener("resize",this.getWidthDocument),"ontouchstart"in window?(this.el.track.removeEventListener("touchstart",this.handleMouseDown),this.el.track.removeEventListener("touchend",this.handleMouseUp),this.el.track.removeEventListener("touchmove",this.handleMouseMove)):(this.el.track.removeEventListener("mousedown",this.handleMouseDown),this.el.track.removeEventListener("mouseup",this.handleMouseUp),this.el.track.removeEventListener("mousemove",this.handleMouseMove))},methods:{getWidthDocument(){this.width.document=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth},getWidth(){this.width.container=this.el.list.clientWidth,1==this.settings.items?(this.width.slide=this.width.container,this.width.track=this.width.container*this.numItemAll):(this.width.slide=this.width.container/this.settings.items-(this.settings.items-1)*this.settings.margin/this.settings.items,this.width.track=(this.width.container+this.settings.margin)*this.numItemAll)},reload(){this.responsive&&(this.breakpoints=Object.keys(this.responsive)),this.breakpoints&&this.breakpoints.forEach((t=>{if(t<=this.width.document)for(let e in this.responsive[t])this.settings[e]=this.responsive[t][e]})),this.getWidth(),1==this.settings.items?this.settings.margin=0:this.settings.margin=this.margin;for(let t=0;t<this.numItemAll;++t)this.el.slides[t].style.width=this.width.slide+"px",this.el.slides[t].style.marginRight=this.settings.margin+"px";for(let t=0;t<this.numItemAll-1;++t)this.el.slides[t].classList.remove("active");this.settings.loop?this.transform=this.numItemReal*(this.width.slide+this.settings.margin):this.transform=0,this.addActiveClass(this.itemActive),this.numDot=Math.ceil(this.numItemReal/this.settings.items)},addActiveClass(t){this.settings.loop&&(t+=this.numItemReal);let e=t+Math.floor(this.settings.items/2);this.el.slides[e].classList.add("super");for(let s=0;s<this.settings.items;++s)this.el.slides[t].classList.add("active"),++t},setSlide(t,e=!0){for(let s=0;s<this.numItemAll-1;++s)this.el.slides[s].classList.remove("active","super");this.settings.loop?this.transform=(t+this.numItemReal-1)*(this.width.slide+this.settings.margin):this.transform=t*(this.width.slide+this.settings.margin),this.transform+=this.width.slide+this.settings.margin,this.settings.speed=e?this.speed:0,this.settings.loop?(t<0?(this.itemActive=this.numItemReal-1,setTimeout((()=>{this.setSlide(this.itemActive,!1)}),this.speed)):t>=this.numItemReal?(this.itemActive=0,setTimeout((()=>{this.setSlide(0,!1)}),this.speed)):this.itemActive=t,this.addActiveClass(this.itemActive)):(t<0?this.itemActive=0:t>=this.numItemReal-this.settings.items?this.itemActive=this.numItemReal-this.settings.items:this.itemActive=t,this.transform=this.itemActive*(this.width.slide+this.settings.margin),this.addActiveClass(this.itemActive))},nextSlide(){this.setSlide(this.itemActive+this.settings.offset)},prevSlide(){this.setSlide(this.itemActive-this.settings.offset)},setDot(t){if(this.settings.loop)this.setSlide((t-1)*this.settings.items);else if(t==this.numDot){let e=this.numItemReal%this.settings.items;0==e?this.setSlide((t-1)*this.settings.items):this.setSlide(this.numItemReal-this.settings.items)}else this.setSlide((t-1)*this.settings.items)},handleMouseDown(t){t.touches||t.preventDefault(),this.mouseDown=!0,this.dragStartX="ontouchstart"in window?t.touches[0].clientX:t.clientX,this.dragStartY="ontouchstart"in window?t.touches[0].clientY:t.clientY},handleMouseMove(t){let e="ontouchstart"in window?t.touches[0].clientX:t.clientX,s="ontouchstart"in window?t.touches[0].clientY:t.clientY,i=Math.abs(e-this.dragStartX),n=Math.abs(s-this.dragStartY);i>3*n&&(this.dragDistance=e-this.dragStartX,this.disableScroll())},handleMouseUp(){this.mouseDown=!1,this.enableScroll()},disableScroll(){document.ontouchmove=function(t){t.preventDefault()}},enableScroll(){document.ontouchmove=function(t){return!0}}},computed:{documentWidth:function(){return this.width.document}},watch:{documentWidth(){this.reload()},dragDistance(){this.mouseDown&&(this.dragDistance>this.swipeDistance&&(this.prevSlide(),this.handleMouseUp()),this.dragDistance<-1*this.swipeDistance&&(this.nextSlide(),this.handleMouseUp()))}},updated:function(){this.$nextTick((function(){if(this.settings.loop)this.numDotActive=Math.ceil(this.itemActive/this.settings.items+.1);else{let t=this.numItemReal%this.settings.items;0==t?this.numDotActive=Math.ceil(this.itemActive/this.settings.items+.1):this.itemActive>=this.numItemReal-this.settings.items?this.numDotActive=this.numDot:this.numDotActive=Math.ceil(this.itemActive/this.settings.items+.1)}if(this.sibling){this.el.activeItem=this.$el.getElementsByClassName("v_slider__track")[0];for(let t=0;t<this.el.activeItem.children.length;++t)this.el.activeItem.children[t].removeEventListener("click",this.nextSlide),this.el.activeItem.children[t].removeEventListener("click",this.prevSlide);this.el.activeItem=this.el.activeItem.getElementsByClassName("super")[0],this.el.activeItem.nextElementSibling.addEventListener("click",this.nextSlide),this.el.activeItem.previousElementSibling.addEventListener("click",this.prevSlide)}}))}},R=s(89);const U=(0,R.Z)(C,[["render",x]]);var W=U,O=s(6265),j=s.n(O),B={data(){return{isUsersLoading:!1,nameUser:"",users:[],posts:[],page:1,limit:3,options:{items:4,margin:46,nav:!0,dots:!1,loop:!1,timing:"cubic-bezier(0, 0.72, 0.64, 1.06)",offset:1,prevNav:"",nextNav:"",sibling:!1,responsive:{0:{items:1},500:{items:2},899:{items:3},1200:{items:4}}}}},components:{"v-slider":W},methods:{loadPostsAndChangeColor(t,e){this.nameUser=t.name,10===this.page?this.page=1:this.page=this.page+1;let s=document.getElementsByClassName("user");for(let i=0;i<s.length;i++)s[i].childNodes[1].classList.contains("active-color")&&(s[i].childNodes[1].classList.remove("active-color"),s[i].childNodes[2].classList.remove("active-color"));e=e.classList.contains("user")?e:e.parentElement,e.childNodes[1].classList.add("active-color"),e.childNodes[2].classList.add("active-color"),this.fetchPosts()},async fetchUsers(){try{this.isUsersLoading=!0;const t=await j().get("https://jsonplaceholder.typicode.com/users?_limit=10");this.users=t.data;for(let e=0;e<this.users.length;e++)this.users[e].image=this.randomImage();this.nameUser=this.users[0].name}catch(t){console.log("ошибка 1")}finally{this.isUsersLoading=!1}},async fetchPosts(){try{const t=await j().get("https://jsonplaceholder.typicode.com/posts",{params:{_page:this.page,_limit:this.limit}});this.posts=t.data}catch(t){console.log("ошибка 2")}},randomImage(){let t=320+81*Math.random();return`https://i.pravatar.cc/${Math.floor(t)}`},setActiveColor(){let t=document.getElementsByClassName("user")[0];t.childNodes[1].classList.add("active-color"),t.childNodes[2].classList.add("active-color")}},mounted(){this.fetchUsers(),this.fetchPosts(),setTimeout((()=>this.setActiveColor()),500)}};const T=(0,R.Z)(B,[["render",b]]);var Y=T;(0,i.ri)(Y).mount("#app")}},e={};function s(i){var n=e[i];if(void 0!==n)return n.exports;var l=e[i]={exports:{}};return t[i](l,l.exports,s),l.exports}s.m=t,function(){var t=[];s.O=function(e,i,n,l){if(!i){var o=1/0;for(c=0;c<t.length;c++){i=t[c][0],n=t[c][1],l=t[c][2];for(var a=!0,h=0;h<i.length;h++)(!1&l||o>=l)&&Object.keys(s.O).every((function(t){return s.O[t](i[h])}))?i.splice(h--,1):(a=!1,l<o&&(o=l));if(a){t.splice(c--,1);var r=n();void 0!==r&&(e=r)}}return e}l=l||0;for(var c=t.length;c>0&&t[c-1][2]>l;c--)t[c]=t[c-1];t[c]=[i,n,l]}}(),function(){s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,{a:e}),e}}(),function(){s.d=function(t,e){for(var i in e)s.o(e,i)&&!s.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};s.O.j=function(e){return 0===t[e]};var e=function(e,i){var n,l,o=i[0],a=i[1],h=i[2],r=0;if(o.some((function(e){return 0!==t[e]}))){for(n in a)s.o(a,n)&&(s.m[n]=a[n]);if(h)var c=h(s)}for(e&&e(i);r<o.length;r++)l=o[r],s.o(t,l)&&t[l]&&t[l][0](),t[l]=0;return s.O(c)},i=self["webpackChunkinbisyst"]=self["webpackChunkinbisyst"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=s.O(void 0,[998],(function(){return s(9002)}));i=s.O(i)})();
//# sourceMappingURL=app.a4c43fcb.js.map