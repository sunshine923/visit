window.onload = function() {
    window.onscroll = function () {
        let header = document.getElementsByTagName('header')[0];
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (scrollTop > 360) {
            header.style.opacity = '0'
        } else {
            header.style.opacity = '1'
        }
    }
    let banner = document.getElementsByClassName('scroll')[0];
    let bannerli = document.querySelectorAll('.scroll>li');
    let left = document.getElementsByClassName('clickleft')[0];
    let right = document.getElementsByClassName('clickright')[0];
    let num = 0;
    let now = 0;
    let next = 0;
    let w = parseInt(window.getComputedStyle(bannerli[0], null).width);
    let flag = true;
    let t;
    t = setInterval(move, 3000)
    banner.onmouseover = function () {
        clearInterval(t);
    }
    banner.onmouseout = function () {
        t = setInterval(move, 3000);
    }
    left.onmouseover = function () {
        clearInterval(t);
    }
    left.onmouseout = function () {
        t = setInterval(move, 3000);
    }
    right.onmouseover = function () {
        clearInterval(t);
    }
    right.onmouseout = function () {
        t = setInterval(move, 3000);
    }
    left.onclick = function () {
        if (!flag) {
            return;
        }
        moveL();
        flag = false;
    }
    right.onclick = function () {
        if (!flag) {
            return;
        }
        move();
        flag = false;
    }

    /////////////////////////////////自动轮播///////////////////////////////
    function move() {
        next++;
        if (next == bannerli.length) {
            next = 0;
        }
        bannerli[next].style.left = `${w}px`;
        animate(bannerli[now], {left: -w})
        animate(bannerli[next], {left: 0}, function () {
            flag=true;
        })
        now = next;
    }

    function moveL() {
        next--;
        if (next < 0) {
            next = bannerli.length - 1;
        }
        bannerli[next].style.left = `${-w}px`;
        animate(bannerli[now], {left: w})
        animate(bannerli[next], {left: 0}, function () {
            flag=true;
        })
        now = next;
    }

}