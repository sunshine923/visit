$(function () {
    let hot = $('.details');
    let btns = $('.btns');
    let food = $('.food');
    let btns1 = $('.btns1');
    let poor = $('.poor');
    let btns2 = $('.btns2');
    let num = 3;
    let hmain = $('.hmain');
    $.ajax({
        url:'/visit/index.php/contact/head',
        method:'post',
        dataType:'json',
        success:function(data){
            show(data);
        }
    })
    function show(data){
        hmain.empty();
        let s = `
            <li>
				<a href="/visit/index.php/home">${data[0]['title']}
				</a>
			</li>
			<li><a href="/visit/index.php/tour">${data[1]['title']}<div class="blue"><img src="/visit/Public/img/blue.png" alt=""></div></a></li>
			<li style="border-radius: 0 0 9px 0"><a href="/visit/index.php/newslist">${data[2]['title']}</a></li>
			<li style="width: 228px">
				<div class="himg"><img src="/visit/Public/img/mountain.png" alt=""></div>
			</li>
			<li style="border-radius: 0 0 0 9px"><a href="/visit/index.php/about">${data[3]['title']}</a></li>
			<li><a href="/visit/index.php/culture">${data[4]['title']}</a></li>
			<li><a href="/visit/index.php/contact">${data[5]['title']}
			</a></li>
        `
        hmain.html(s)
    }

    /////////////////////////////////////热门攻略///////////////////////////////////////
    $.ajax({
        url: '/visit/index.php/tour/hotpage',
        data:{page:1},
        dataType: 'json',
        success: function success(total) {
            let pages = total/num
            btn(pages);
            fn(total,1);
            $('.pages').on('click',function () {
                hot.empty();
                let page = $(this).html().substr(1,1);
                fn(total,page)
            })
            $('.btn-prev').on('click',function () {
                hot.html('')
                let page;
                let now = $('.active').html().substr(1,1);
                if(now-1>0){
                    page = now-1;
                }else{
                    page = now;
                }
                fn(total,page);
            })
            $('.btn-next').on('click',function () {
                hot.html('')
                let page;
                let now = $('.active').html().substr(1,1);
                if(now*1+1>pages){
                    page = now*1;
                }else{
                    page = now*1 + 1;
                }
                fn(total,page);
            })
        }
    })
    ////////////////////函数部分/////////////////////////
    function fn(data,page) {
        for(let i=0;i<data;i++){
            $('.pages').removeClass('active')
        }
        $('.pages').eq(page-1).addClass('active');
        $.ajax({
            url: '/visit/index.php/tour/hotCollect',
            data:{page},
            dataType: 'json',
            success:function (data) {
                render(data,page);
            }
        });
    }
    function render(data,page) {
        $.each(data,function (index,value) {
            hot.html(function (i,v) {
                return v+`
                	<li>
                	<a href="/visit/index.php/detail?gid=${value.gid}&type=${value.type}">
				<div class="dimg1">
					<p>0${(page-1)*3+index+1}</p>
					<div class="zz"></div>
				</div>
				<div class="dimg2">
					<img src=${value.thumb} alt="">
				</div>
				<div class="dimg3">
					<p class="dimg3w1">${value.title}</p>
					<p class="dimg3w2">${value.description}</p>
					<div class="jiantou"></div>
					<div class="sanjiao"></div>
					<div class="look">
                        <div class="l1"><div class="circle"></div><span>${value.look}</span>人浏览</div>
                        <div class="l1"><div class="circle1"></div><span>${value.time.split(' ')[0]}</span></div>
					</div>
				</div>
				</a>
			</li>
                `
            })
        })
    }
    function btn(data) {
        btns.empty();
        btns.html( `<div class="btn-prev"><img src="/visit/Public/img/left.png" alt=""></div>`)
        for(let i =0;i<data;i++){
            btns.html(function (index,value) {
                return value + `<li class="pages">0${i+1}</li>`
            })
        }
        btns.html(function (index,value) {
            return value + `<div class="btn-next"><img src="/visit/Public/img/right.png" alt=""></div>`
        })
    }
    ////////////////////////////////////////美食攻略////////////////////////////////////////////
    $.ajax({
        url: '/visit/index.php/tour/foodpage',
        data:{page:1},
        dataType: 'json',
        success: function success(total) {
            let pages = total/4
            btn1(pages);
            fn1(total,1);
            $('.pages1').on('click',function () {
                food.empty();
                let page = $(this).html().substr(1,1);
                fn1(total,page)
            })
            $('.btn-prev1').on('click',function () {
                food.html('')
                let page;
                let now = $('.active').html().substr(1,1);
                if(now-1>0){
                    page = now-1;
                }else{
                    page = now;
                }
                fn1(total,page);
            })
            $('.btn-next1').on('click',function () {
                food.html('')
                let page;
                let now = $('.active').html().substr(1,1);
                if(now*1+1>pages){
                    page = now*1;
                }else{
                    page = now*1 + 1;
                }
                fn1(total,page);
            })
        }
    })
    function fn1(data,page) {
        for(let i=0;i<data;i++){
            $('.pages1').removeClass('active')
        }
        $('.pages1').eq(page-1).addClass('active');
        $.ajax({
            url: '/visit/index.php/tour/foodCollect',
            data:{page},
            dataType: 'json',
            success:function (data) {
                render1(data,page);
            }
        });
    }
    function render1(data,page) {
        food.empty();
        $.each(data,function (index,value) {
            food.html(function (i,v) {
                return v+`
                	<li data=${JSON.stringify(value)}>
                	<a href="/visit/index.php/detail?gid=${value.gid}&type=${value.type}">
				<div class="foodimg">
					<img src="${value.thumb}" alt="">
				</div>
				<div class="fword1">${value.title}</div>
				<div class="fword2">THE HOT</div>
				<p class="fword3">${value.description}</p><br>
				<div class="foot">
				    <div class="l1">
                        <div class="fyuan1"></div>
                        <span>${value.look}</span>次浏览
					</div>
					<div class="l1">
                        <div class="fyuan2" style="background: #2E5CBA"></div>
                        <span>${value.time.split(' ')[0]}</span>
					</div>
				</div>
				</a>
			</li>
                `
            })
        })
    }
    function btn1(data) {
        btns1.empty();
        btns1.html( `<div class="btn-prev1"><img src="/visit/Public/img/left.png" alt=""></div>`)
        for(let i =0;i<data;i++){
            btns1.html(function (index,value) {
                return value + `<li class="pages1">0${i+1}</li>`
            })
        }
        btns1.html(function (index,value) {
            return value + `<div class="btn-next1"><img src="/visit/Public/img/right.png" alt=""></div>`
        })
    }
    ///////////////////////////////////////穷游攻略//////////////////////////////////
    $.ajax({
        url: '/visit/index.php/tour/poorpage',
        data:{page:1},
        dataType: 'json',
        success: function success(total) {
            let pages = total/3
            btn2(pages);
            fn2(total,1);
            $('.pages2').on('click',function () {
                poor.empty();
                let page = $(this).html().substr(1,1);
                fn2(total,page)
            })
            $('.btn-prev2').on('click',function () {
                poor.html('')
                let page;
                let now = $('.active').html().substr(1,1);
                if(now-1>0){
                    page = now-1;
                }else{
                    page = now;
                }
                fn2(total,page);
            })
            $('.btn-next2').on('click',function () {
                poor.html('')
                let page;
                let now = $('.active').html().substr(1,1);
                if(now*1+1>pages){
                    page = now*1;
                }else{
                    page = now*1 + 1;
                }
                fn2(total,page);
            })
        }
    })
    function fn2(data,page) {
        for(let i=0;i<data;i++){
            $('.pages2').removeClass('active')
        }
        $('.pages2').eq(page-1).addClass('active');
        $.ajax({
            url: '/visit/index.php/tour/poorCollect',
            data:{page},
            dataType: 'json',
            success:function (data) {
                render2(data,page);
            }
        });
    }
    function render2(data,page) {
        poor.empty();
        $.each(data,function (index,value) {
            poor.html(function (i,v) {
                return v+`
                	<li data = ${JSON.stringify(value)}>
                	<a href="/visit/index.php/detail?gid=${value.gid}&type=${value.type}">
				<div class="pimg">
					<img src="${value.thumb}" alt="">
				</div>
				<div class="pw">${value.title}</div>
				<div class="new">
					<img src="/visit/Public/img/new.png" alt="">
				</div>
				<div class="hot">
					<img src="/visit/Public/img/hot1.png" alt="">
				</div><br>
				<div class="score">	
					<div class="pw1">${value.small}</div>
					<div class="pw2">/</div>
					<div class="pw3">${value.smalltitle}</div>
				</div>
				<div class="pline">
					<img src="/visit/Public/img/pline.png" alt="">
				</div>
				<div class="pw4">${value.description}</div>
				</a>
			</li>
                `
            })
        })
    }
    function btn2(data) {
        btns2.empty();
        btns2.html( `<div class="btn-prev2"><img src="/visit/Public/img/left.png" alt=""></div>`)
        for(let i =0;i<data;i++){
            btns2.html(function (index,value) {
                return value + `<li class="pages2">0${i+1}</li>`
            })
        }
        btns2.html(function (index,value) {
            return value + `<div class="btn-next2"><img src="/visit/Public/img/right.png" alt=""></div>`
        })
    }

})