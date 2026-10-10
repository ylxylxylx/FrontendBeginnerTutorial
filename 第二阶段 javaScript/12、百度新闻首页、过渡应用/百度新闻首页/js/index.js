// 导航菜单动画

var navLis = document.querySelectorAll('.nav li');
var navBg = document.querySelector('.nav .bg');
var nav = document.querySelector('.nav');

for(var i = 0; i < navLis.length; i++){
    navLis[i].onmouseenter= function(){
        // console.log(this.offsetLeft, this.offsetWidth);
        // bg最终的位置是每一个li标签的偏移量
        navBg.style.left = this.offsetLeft + 'px';
        navBg.style.width = this.offsetWidth + 'px';
    }
    navLis[i].onmouseleave = function(){
        // 当鼠标移出的时候，让bg恢复
        navBg.style.left = 0;
        navBg.style.width = navLis[0].offsetWidth + 'px';
    }
}



// 动态固定位置
// console.log(scrollTop, nav.offsetTop);
// var rect = nav.getBoundingClientRect();
// console.log(rect);

// console.log(rect.top, nav.offsetTop);

var rightNav = document.querySelector('.right-nav-box');
var offsetTop = nav.offsetTop;

window.onscroll = function(){
    var scrollTop = document.scrollingElement.scrollTop;
    // 滚动的距离，使用nav到顶部的距离：到顶部的偏移量
    if (scrollTop >= offsetTop) {
        nav.style.position = 'fixed';
    } else {
        nav.style.position = 'static';
    }

    if (scrollTop >= 300) {
        rightNav.style.transform = 'translateY(0)';
    } else {
        rightNav.style.transform = 'translateY(53px)';
        
    }
}

// 返回顶部
var goTop = document.querySelector('.go-top');
goTop.onclick = function(){
    // 设置跳转位置：两个值分别是x方向和y方向
    window.scroll(0,0);

    // document.scrollingElement.scrollTop = 0;
    // document.documentElement.scrollTop = 0;
}